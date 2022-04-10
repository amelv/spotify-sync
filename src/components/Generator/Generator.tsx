import React, {useState, useContext} from "react"
import Q from "q"

import Spotify from "spotify-web-api-js"

import {AuthContext} from "../AuthContext"

const spotifyApi = new Spotify()

export interface GeneratorProps {
    zodiacSign: string,
    valence: number,
    energy: number,
    playlistName: string,
}

const Generator = ({zodiacSign, valence, energy, playlistName}: GeneratorProps) => {
    const {loggedIn, accessToken, setLoggedIn, setToken} = useContext(AuthContext)

    spotifyApi.setAccessToken(accessToken)

    spotifyApi.setPromiseImplementation(Q)
  
    const [userId, setUserId] = useState("")
    const [playlistId, setPlaylistId] = useState("")

    const playlistOptions = {
        name: playlistName,
        description: "Your Daily Horoscope in Music Form",
        public: false 
    }

    console.log(energy)
    spotifyApi.getMe()
        .then((data) => {
            console.log(data)
            return data.id 
        })
        .then((userId) => {
            console.log(userId)
            return spotifyApi.createPlaylist(userId, playlistOptions) 
        })
        .then((data) => {
            setPlaylistId(data.id)
            return spotifyApi.getMyTopArtists({limit: 5})
        })
        .then((data) => {
            console.log(data)
            return data.items.map((artist) => {
                return artist.id
            })
        })
        .then((topArtists) => {
            console.log(topArtists)
            let recOptions = {
                limit: 20,
                seed_artists: topArtists,
                target_valence: valence,
                target_energy: energy
            }
            return spotifyApi.getRecommendations(recOptions)
        }).then((data) => {
            console.log(data)
            return data.tracks.map((track) => {
                return track.uri
            })
        })
        .then((playlistTracks) => {
            console.log(playlistTracks)
            return spotifyApi.addTracksToPlaylist(playlistId, playlistTracks)
        }).then((data) => {
            console.log(data)
        }, (error) => {
            console.error(error)
        })

   
    return (
        <p>
      Generated {playlistName || "missing"} playlist. 
        </p>
    )

}

export default Generator
