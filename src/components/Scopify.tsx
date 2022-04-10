import React, {useState} from "react"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import {Helmet} from "react-helmet"
import {Routes} from "./Routes.js"
import {AuthContext} from "./AuthContext"

export const Scopify = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [accessToken, setToken] = useState("")
    const value = {loggedIn, accessToken, setLoggedIn, setToken}

    return (
        <AuthContext.Provider {...{value}}>
            <div style={{minHeight: "100vh", background: "rgb(127,24,161)"}}>
                <Helmet>
                    <title>Scopify 🔮</title>
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="Scopify: daily horoscope playlists." />
                    <link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet" />
                </Helmet>
                <Header />
                <Routes />
                <Footer />
            </div>
        </AuthContext.Provider>
    )
    
}
