import React, { useState, useReducer } from 'react';
import './App.css';
import Form from './components/Form';
import Spotify from 'spotify-web-api-js';
import {withStyles} from "@material-ui/core/styles"

import { Slider, Typography } from '@material-ui/core'

const spotifyWebApi = new Spotify();


const slider_style = { width: 300, margin: 25 };
const handle_style = {
    borderColor: 'black',
    height: 15,
    width: 15,
    marginLeft: -4  ,
    marginTop: -5.75,
    backgroundColor: '#fc9583'
}
const mintrack_style = {
  backgroundColor: '#fcfcfc', height: 2
}
const maxtrack_style = {
  backgroundColor: '#020000', height: 2
}

const styles = (theme) => ({
  body: {
    //fontFamily: "
    backgroundColor: "#fccf9c" 
  },

  wrapper: {
    background: "linear-gradient(to right, #fcc255, #fcf8ed)",
    height: "100vh",
    display: "flex",
    paddingTop: "250px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: "1",
  },

  label: {},
})

    const getHashParams = () => {
      let hashParams = {};
      let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
     return hashParams;
    }


const RecGen = (props) => {
    const params = getHashParams();
  const [loggedIn, setLoggedIn] = useState(params.access_token ? true: false)
  const [songName, setSongName] = useState('Not Checked')
  const [songImage, setSongImage] = useState('')
  //tracks? we need a tracks variable when we do playlist

    const [recs, setRecs] = useState([])

    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }

  const defaultInputs = {
        Acousticness: 0.5,
        Danceability: 0.5,
        Energy: 0.5,
        Liveness: 0.5,
        Popularity: 50,
        Valence: 0.5
     }

const inputReducer = (state, action) => {
  if (action.type == "update") {
    let newInputs = state
    newInputs[action.key] = action.value
    return newInputs 
  } else if (action.type == "default") {
    return defaultInputs
  } else {
    throw new Error();
  }
}
    //look into useReducer
  const [inputs, inputDispatch] = useReducer(inputReducer, defaultInputs)

  
    const getRec = async (e) => {
      e.preventDefault();
      const song = e.target.elements.song.value;
	    console.log("getting recs...");
      const rec_res = await spotifyWebApi.getRecommendations({ seed_tracks: [song] });
      setRecs(rec_res.tracks)
      console.log(recs);
/*    const create_res = await spotifyWebApi.createPlaylist({
      "name": "New Playlist",
      "description": "New playlist description",
      "public": false
    } */
    //we could then have the user chose to keep or remove the song from the playlist
    //also the sliders for each track
    }


    const getPlayURL = () => {
      return "https://open.spotify.com/embed/track/" + recs[0].id;
    }


    const getNowPlaying = () => {
     spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        setSongName(response.item.name)
        setSongImage(response.item.album.images[0].url)
      })
    }
console.log(inputs)

    const classes = {props}
    return (
      <div className={classes.wrapper}>
        <a href = 'http://localhost:8888'>
          <button>Log in With Spotify</button>
        </a>
        <div> Now Playing: { songName}</div>
        <div>
          <img src= {songImage} style = {{ width: 50}}/>
        </div>
        <button onClick= {()=> getNowPlaying()}>
          Check Now Playing
        </button>

        {Object.keys(inputs).map(inputKey => 
            <div key={inputKey} style={slider_style}>
              <Typography gutterBottom >{`${inputKey}`}</Typography>
              <Slider 
                value={(inputKey == "popularity")? 50.0 : 0.5} 
                step={(inputKey == "popularity")? 1.0 : 0.01} min={0.0} 
                max={(inputKey == "popularity")? 100.0 : 1.0}
                onChange={(value) => inputDispatch({type: "update", key: inputKey, value: value})}
              />
            </div> 
          )
        }
	      <Form getRec={getRec}/>
        <div>
          <iframe src= { recs[0] && getPlayURL() } width="300" height="100" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
      </div>
    );
}


export default withStyles(styles)(RecGen) 
