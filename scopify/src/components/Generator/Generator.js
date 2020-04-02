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

  const { zodiacSign, valence, energy, name } = props
  
  spotifyApi.setAccessToken(accessToken)

  spotifyApi.setPromiseImplementation(Q);
  
  let userId  = ''

  spotifyApi.getMe()
    .then((data) => {
      console.log(data)
      userId = data.id
    }, (error) => {
      console.error(error)
    })
   
  const playlistOptions = {
    name: name,
    description: 'Your Daily Horoscope in Music Form',
    public: false // this should be a variable set by user
  }
  
  let playlistId = ''

  spotifyApi.createPlaylist(userId, playlistOptions)
    .then((data) => {
      playlistId = data.id 
    }, (error) => {
      console.error(error)
    })


  let topArtists = []
  
  // consider getting more and then filtering which ones to use?
  spotifyApi.getMyTopArtists({limit: 5})
    .then((data) => {
      data.items.map((artist) => {
        topArtists.push(artist.id)
      })
    }, (error) => {
      console.error(error)
    })
  
  const recOptions = {
    limit: 20,
    seed_artists: topArtists,
    target_valence: valence,
    target_energy: energy
  }

  let playlistTracks = []

  spotifyApi.getRecommendations(recOptions)
    .then((data) => {
      data.tracks.map((track) => {
        playlistTracks.push(track.uri)
      })
    }, (error) => {
      console.error(error)
    })
  
  spotifyApi.addTracksToPlaylist(playlistId, playlistTracks)
    .then((data) => {
      console.log(data)
    }, (error) => {
      console.error(error)
    })

  return (
   "" 
  )

}

export default Generator
