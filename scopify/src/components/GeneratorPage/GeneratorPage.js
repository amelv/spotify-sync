import React, {useState, useEffect, useContext} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import Particles from "react-particles-js"
import styled from "styled-components"
import {CSSTransition} from "react-transition-group"
import {withRouter} from "react-router"

import {Button} from "semantic-ui-react"
import {Container} from "semantic-ui-react"
import {Header} from "semantic-ui-react"
import {Divider} from "semantic-ui-react"
import {Grid, Image, Input} from "semantic-ui-react"
import _ from "lodash"

import "./style.css"
import "../GlobalStyle.css"
import Slider from "react-input-slider"

import Spotify from "spotify-web-api-js"

import {AuthContext} from "../AuthContext"
import Generator from "../Generator/Generator"

const spotifyWebApi = new Spotify()

const HoroscopeInput = (props) => {
    let zodiacIcons = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]
    let zodiacNames = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
  
    const handleClick = (e) => {
        let val = e.target.value
        props.setSign(val)
    }

    let grid = _.times(3, (row) => (
      <Grid.Row 
        style={{
          display: "flex", 
          flexDirection: "row", 
          alignItems: "center", 
          textAlign: "center", 
          flexWrap: "nowrap"
        }} 
        key={row}
      >
        {_.times(4, (col) => {
          let pos = 4*row + col
          return (
            <Grid.Column 
              key={pos} 
              style={{
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                textAlign: "center", 
                flexWrap: "nowrap"
              }}>
              <Button 
                onClick={(e) => {
                  props.setSign(zodiacNames[4*row + col])
                }}
                value={zodiacNames[pos]} 
                style={{
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  alignContent: "center", 
                  color: "transparent", 
                  width: "150px", 
                  height: "150px"
                }} 
                as={Link} 
                to='/step2'
              >
                <Header as='h1' style={{pointerEvents: "none"}}>
                  {zodiacIcons[pos]}
                </Header>
                <Header as='h3' style={{pointerEvents: "none"}}>
                  {zodiacNames[pos]}
                </Header>
              </Button>
            </Grid.Column>
        )})}
      </Grid.Row> 
    ))
  
    return (
        <Grid columns={4} divided>
            {grid}
        </Grid>
    )
}

const MoodInput = (props) => {
    const [value, setValue] = useState({x: 50, y: 50})

    const handleValueChange = e => {
        let value = parseInt(e.target.value)
    
        if (!value) {
            value = 0
        }

        setValue(e.target.value)
    }

    return (
      <Container 
        style={{
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          textAlign: "center"
        }}
      >
        <Header as='h1' style={{marginBottom: "5%"}} >Mood</Header>
        <div 
          style={{
            display: "flex",
            flexDirection: "row", 
            alignItems: "flex-end"
          }}
        >
          <Header as='h1' floated='left'>Angry</Header>
          <span style={{display: "inline-block", width: 400}} />
          <Header as='h1' floated='right' >Bright</Header>
        </div>

        <Slider style={{width: 440, height: 400}} axis="xy" x={value.x} y={value.y} onChange={setValue} />    

        <div style={{display: "flex" ,flexDirection: "row", alignItems: "flex-end"}}>
          <Header as='h1' floated='left' >Melancholic</Header>
          <span style={{display: "inline-block", width: 400}} />
          <Header as='h1' floated='right' >Calm</Header>
        </div>
        <Button as={Link} 
          onClick={(e) => {
            props.setValence(value.x / 100.0)
            props.setEnergy(value.y / 100.0)
          }}
          to='/step3'
        >
          Next Step
        </Button> 
      </Container>
    )
}


const NameInput = (props) => {
    const [value, setValue] = useState("")


    const handleValueChange = e => {
        let value = e.target.value
    
        if (!value) {
            value = ""
        }

        setValue(value)
    }

    return (
      <Container 
        style={{
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          textAlign: "center"
        }}>
            <Header as='h1'>Mood</Header>
            <Input focus onChange={handleValueChange} placeholder='Enter playlist name...' />
            <Button as={Link} 
                onClick={(e) => {
                    props.setName(value)
                }} 
                to='/step4'>Generate Playlist</Button> 
      </Container>

    ) 
}

const Finished = (props) => {
  
    return (
        <Container>
            <Header as='h1' >
              Check your spotify for the playlist!
            </Header>
            <Generator {...props} />
        </Container>
    )
}

const GeneratorPage = (props) => {
    const [zodiacSign, setSign] = useState("")
    const [valence, setValence] = useState(0.5)
    const [energy, setEnergy] = useState(0.5)
    const [name, setName] = useState("")
    const [isLoaded, setLoaded] = useState(false)

    let num = props.match.params.num
  
    let inputs = [HoroscopeInput, MoodInput, NameInput, Finished]

    let InputComponent = inputs[num-1]

    useEffect(() => {
        setLoaded(true)
    }, [isLoaded])

    return (
        <CSSTransition classNames='fade' timeout={{enter: 500, exit: 300}} >
          <Container 
            style={{
              display: "flex", 
              background: "rgb(127,24,161)", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center", 
              height: "100vh"
            }} >
              {num < 4 ? (
                <InputComponent setSign={setSign} setValence={setValence}
                setEnergy={setEnergy} setName={setName} />
              ) : (
                <InputComponent zodiacSign={zodiacSign} valence={valence}
                energy={energy} playlistName={name} />
              )}
               <Divider />
          </Container> 
        </CSSTransition>
    )
}

GeneratorPage.propTypes = {
}

export default GeneratorPage
