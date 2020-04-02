import React, { useContext } from "react"
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
import SpotifyLogin from 'react-spotify-login';
import { clientId, redirectUri } from './settings';
import {AuthContext} from '../AuthContext'

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

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

const LandingPage = (props) => {
  const { loggedIn, accessToken, setLoggedIn, setToken } = useContext(AuthContext)

  return (
    <Container style={{display: "flex", 
      background: "rgb(127,24,161)",
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh",
      }} >
      <Header 
        as='h1' 
        style={{fontSize: "10rem", margin: "1rem"}}>𝕾𝖈𝖔𝖕𝖎𝖋𝖞</Header>
        <p style={{fontSize: "2rem", margin: "1rem"}}> Horoscoped Playlists </p>
       {loggedIn ? '' : (
          <Button as={SpotifyLogin} 
          clientId={clientId}
          redirectUri={redirectUri}
          onSuccess={(response) => {
            setToken(response.access_token)
            setLoggedIn(true)
            console.log(accessToken)
            console.log(response.access_token)
          }}
          onFailure={onFailure}
          content='Log In to Spotify'/>
        )} 
        <Button 
          as={ Link }
          to='/step1' 
          size='massive'
          style={{margin: "1rem"}} 
          content='Get Started' />
      <Divider />

    </Container>
  )
}

LandingPage.propTypes = {
}

export default withRouter(LandingPage)
