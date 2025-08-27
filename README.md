# Spotify Sync ⌰

A Next.JS app that will sync your Spotify Account's Songs and Albums. Sync all albums or just a few. 

<img width="1598" height="729" alt="Screenshot from 2025-08-27 08-50-45" src="https://github.com/user-attachments/assets/9f2fd2f4-3eba-4f67-88ec-5e18f250be90" />


## How to use

1. Clone the repo
2. Create a Spotify App in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
3. Add `http://localhost:3000` as a Redirect URI in the Spotify App
4. Create a `.env` file in the root of the project and add the following:
```
SPOTIFY_CLIENT_SECRET=<YOUR_SPOTIFY_CLIENT_SECRET>
SPOTIFY_CLIENT_ID=<YOUR_SPOTIFY_CLIENT_ID>
```
5. Run `yarn install` to install dependencies
6. Run `yarn dev` to start the app
7. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
8. Login with your Spotify Account
9. Click the `Sync` button to sync your albums and songs

## How it works

The app uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to authenticate the user and fetch their albums and songs. The app uses the [Implicit Grant Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow) to authenticate the user. The app does not store any user data.

The app uses [Zustand](https://github.com/pmndrs/zustand) to manage state. The app uses [React Router](https://reactrouter.com/) to handle routing. The app uses [Material UI](https://material-ui.com/) for styling. The app uses [Trie Search](https://githuh.com/kesne/trie-search) to search through the user's albums and songs.

## Built with

- [React](https://reactjs.org/)
- [Next.JS](https://nextjs.org/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Material UI](https://material-ui.com/)
- [Trie Search](https://githuh.com/kesne/trie-search)

## Project Status

This project is a work in progress. The app is currently in a working state. The app is not yet deployed.

## Support

If you have any questions or issues, please open an issue or email me at [amelv@protonmail.com](mailto:amelv@protonmail.com).

## License

GPL-3.0 © [Alexandra Melvin](amelv.com)
