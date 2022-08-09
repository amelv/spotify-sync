import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// this can be used as a seperate module
const encodeFormData = (data: Record<string, any>) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

router.get("/login", async (req, res) => {
  const scope = `user-modify-playback-state
      user-read-playback-state
      user-read-currently-playing
      user-library-modify
      user-library-read
      user-top-read
      playlist-read-private
      playlist-modify-public`;

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECTURI,
      } as Record<string, string>)
  );
});

router.get("/logged", async (req, res) => {
  const body = {
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri: process.env.REDIRECTURI,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };

  await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    body: encodeFormData(body),
  })
    .then((response) => response.json())
    .then((data) => {
      const query = new URLSearchParams(data as Record<string, any>);
      res.redirect(`${process.env.CLIENT_REDIRECTURI}?${query}`);
    });
});

router.get("/refresh_token", async (req, res) => {
  const body = {
    grant_type: "refresh_token",
    refresh_token: req.query.refresh_token,
    redirect_uri: process.env.REDIRECTURI,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };

  await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    body: encodeFormData(body),
  })
    .then((response) => response.json())
    .then((data: any) => {
      res.send({
        access_token: data?.access_token,
      });
    });
});

export default router;
