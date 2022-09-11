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

export default class SpotifyRequestInterface {
    // Create new rate limit token bucker
    maxRequests = 10;
    maxRequestWindowMS = 1000;
    tokenBucket = new RequestRateLimiter({ maxRequests: this.maxRequests, maxRequestWindowMS: this.maxRequestWindowMS });

    baseURL = "https://api.spotify.com/v1";

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
