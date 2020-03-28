import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import Particles from "react-particles-js"
import styled from "styled-components"
import { CSSTransition } from "react-transition-group";
import { withRouter } from "react-router";

import { Button } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import { Grid, Image } from 'semantic-ui-react'
import _ from 'lodash'

import './style.css'

  /*const StyledGrid = styled(Grid)`
    margin: auto;
    display: flex;
    flex-direction: column;
    padding-left: .5rem;
    padding-right: .5rem;
    height: 100%;
    padding-top: 2rem;
    padding-bottom: 2rem;
    justify-content: space-around;
    align-items: center;
    
    @media screen and (min-width: 60em){
        flex-direction: row;
    }
`*/



const HoroscopeInput = (props) => {
  let zodiacIcons = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']
  let zodiacNames = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  
  const handleClick = (e) => {
    let val = e.target.value
    console.log(val)
  }

  let grid = _.times(3, (row) => (
   <Grid.Row style={{display: 'flex', alignItems: 'center', textAlign: 'center', flexWrap: "nowrap"}} key={row}>
    {_.times(4, (col) => (
      <Grid.Column key={4*row + col} >
        <Button onClick={handleClick} value={zodiacNames[4*row + col]} style={{color: "transparent"}} >
        <Header as='h1' style={{pointerEvents: 'none'}} >{zodiacIcons[4*row + col]}</Header>
        <Header as='h3' style={{pointerEvents: 'none' }}>{zodiacNames[4*row + col]}</Header>
      </Button>
      </Grid.Column>
    ))}
    </Grid.Row> 
  ))
  
  return (
    <Grid columns={4} divided>
      {grid}
    </Grid>
  )
}

const MoodInput = (props) => {

}

const EnergyInput = (props) => {

}

const NameInput = (props) => {

}

const GeneratorPage = (props) => {
  let num = props.match.params.num
  
  let inputs = [HoroscopeInput, MoodInput, EnergyInput, NameInput]
  let InputComponent = inputs[num-1]

  console.log(num)
  return (
   <Container style={{display: "flex", 
      background: "rgb(127,24,161)", background: "linear-gradient(90deg, rgba(127,24,161,1) 70%, rgba(20,200,20,1) 100%)", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
     height: "100vh"}} >
      <InputComponent /> 
      <Divider />

    </Container> 
  )
}

GeneratorPage.propTypes = {
}

export default GeneratorPage
