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

const GeneratorPage = (props) => {
  
  return (
    <Container>
      <Header as='h1'>Scopify</Header>
      <Divider />
      <Header as='h2'> Horoscoped Playlists </Header>
      <p>Test test test test test test</p>
      <Divider />
      <Button content='Log in to Spotify' />


    </Container>
  )
}

GeneratorPage.propTypes = {
}

export default withRouter(GeneratorPage)
