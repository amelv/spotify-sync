import React from "react"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import {Helmet} from "react-helmet"
import Routes from "./Routes.js"

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

export default class Scopify extends React.Component {
    render() {
        return (
            <div style={{minHeight: "100vh"}}>
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
        )
    }
}
