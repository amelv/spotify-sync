import axios, { AxiosError, Method, AxiosResponse } from "axios";
import { RateLimiter } from "limiter";

const sleep = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const nextTick = () => {
  return sleep(0);
};

const getMillisToSleep = (retryHeaderString: string) => {
  let millisToSleep = Math.round(parseFloat(retryHeaderString) * 1000);
  if (isNaN(millisToSleep)) {
    millisToSleep = Math.max(
      0,
      new Date(retryHeaderString).getMilliseconds() -
        new Date().getMilliseconds()
    );
  }
  return millisToSleep;
};

/**
 * Rate limiter that uses a token bucket algorithm to limit the number of requests
 * that can be made in a given time window. If the number of requests exceeds the
 * limit, the requests are queued and executed when the next time window opens.
 */
class RequestRateLimiter {
  maxRequests: number;
  maxRequestWindowMS: number;
  limiter: RateLimiter;

  constructor({
    maxRequests,
    maxRequestWindowMS,
  }: {
    maxRequests: number;
    maxRequestWindowMS: number;
  }) {
    this.maxRequests = maxRequests;
    this.maxRequestWindowMS = maxRequestWindowMS;
    this.limiter = new RateLimiter({
      tokensPerInterval: this.maxRequests,
      interval: this.maxRequestWindowMS,
    });
  }

  acquireToken = async <ReturnType = any,>(
    callback: () => ReturnType
  ): Promise<ReturnType> => {
    if (this.limiter.tryRemoveTokens(1)) {
      nextTick();
      return callback();
    } else {
      await sleep(this.maxRequestWindowMS);
      return this.acquireToken(callback);
    }
  };
}

interface SpotifyApiRequest {
    accessToken: string;
    urlEndpoint: string;
    method: Method;
    data?: any;
  }

/**
 * Class for making requests to the Spotify API.
 */
export default class SpotifyRequestInterface {
    /**
     * The maximum number of requests that can be made in a given time window.
     */
    maxRequests = 10;
    maxRequestWindowMS = 1000;
    tokenBucket = new RequestRateLimiter({ maxRequests: this.maxRequests, maxRequestWindowMS: this.maxRequestWindowMS });

    /**
     * The base URL for the Spotify API.
     */
    baseURL = "https://api.spotify.com/v1";

    /**
     * Makes a request to the Spotify API. If the request fails due to rate limiting,
     * the request is retried after the retry-after time specified in the response.
     * 
     * @param accessToken - The access token to use for the request.
     * @param urlEndpoint - The endpoint to make the request to.
     * @param method - The HTTP method to use for the request.
     * @param data - The data to send with the request.
     */
    makeRequest = async <DataType = any>({
        accessToken,
        urlEndpoint,
        method,
        data,
      }: SpotifyApiRequest): Promise<AxiosResponse<DataType, any>> => {
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        };
        const url = `${this.baseURL}/${urlEndpoint}`;
        try {
          return await this.tokenBucket.acquireToken(() =>
            axios({
              ...{ url, method, data, headers },
            })
          );
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<DataType, any>;
      
            if (axiosError.status === "429") {
              const retryAfter =
                axiosError.config.headers?.["retry-after"].toString() ?? "4";
              const millisToSleep = getMillisToSleep(retryAfter);
              await sleep(millisToSleep);
              return this.makeRequest({ accessToken, urlEndpoint, method, data });
            }
      
            return Promise.reject(axiosError);
          }
          return Promise.reject(error);
        }
      };

}
