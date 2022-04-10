import React, {useState, useEffect, useContext} from "react"
import {Link} from "react-router-dom"
import {withRouter} from "react-router"

import {Button} from "semantic-ui-react"
import {Container} from "semantic-ui-react"
import {Divider} from "semantic-ui-react"
//@ts-ignore
import SpotifyLogin from "react-spotify-login"
import {clientId, redirectUri} from "./settings"
import {AuthContext} from "../AuthContext"

import "../GlobalStyle.css"

const onSuccess = (response: any) => console.log(response)
const onFailure = (response: any) => console.error(response)

const LandingPage = (props: any) => {
    const {loggedIn, accessToken, setLoggedIn, setToken} = useContext(AuthContext)
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
          <Container 
            style={{
              display: "flex", 
              background: "rgb(127,24,161)",
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center", 
              height: "100vh",
            }} 
          >
            <h1 style={{fontSize: "10rem", margin: "1rem"}}>
              𝕾𝖈𝖔𝖕𝖎𝖋𝖞
            </h1>
            <p style={{fontSize: "2rem", margin: "1rem"}}> 
              Horoscoped Playlists 
            </p>
            {!loggedIn ? (
              <SpotifyLogin 
                as={Button} 
                clientId={clientId}
                redirectUri={redirectUri}
                scope={"playlist-modify-public,playlist-modify-private,user-top-read"}
                onSuccess={(response: any) => {
                  setToken(response.access_token)
                  setLoggedIn(true)
                  console.log(accessToken)
                  console.log(response.access_token)
                }}
                onFailure={onFailure}
                content='Log In to Spotify'/>
            ) : (
              <Button 
                as={ Link }
                onClick={() => setLoaded(false)}
                to='/step1' 
                size='massive'
                style={{margin: "1rem"}} 
                content='Get Started' />
            )}
            <Divider />
        </Container>
    )
}

LandingPage.propTypes = {
}

export default withRouter(LandingPage)
