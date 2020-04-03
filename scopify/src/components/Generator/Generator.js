import React, {useState, useContext} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import { CSSTransition } from "react-transition-group";
import { withRouter } from "react-router";
import Q from 'q'
import Slider from "react-input-slider";

import Spotify from 'spotify-web-api-js';

import {AuthContext} from '../AuthContext'

const spotifyApi = new Spotify();


const Generator = (props) => {
  const { loggedIn, accessToken, setLoggedIn, setToken } = useContext(AuthContext)

  const { zodiacSign, valence, energy, playlistName } = props
  
  spotifyApi.setAccessToken(accessToken)

  spotifyApi.setPromiseImplementation(Q);
  
  let userId  = ''
  let playlistId = ''

  let message = ''
  
  let playlistOptions = {
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
      playlistId = data.id
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
      message = data
      console.log(data)
    }, (error) => {
      console.error(error)
    })

   
  return (
    <p>
      Generated {playlistName || 'missing'} playlist. 
    </p>
  )

}

export default Generator
