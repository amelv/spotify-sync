import React from "react"
import Footer from "./Footer/Footer"
import {Helmet} from "react-helmet"
import Routes from "./Routes.js"

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

export default class Atlas extends React.Component {
    render() {
        return (
            <div className= "cf lora f5-ns f6 dark-gray" style={{minHeight: "100vh"}}>
                <Helmet>
                    <title>The Quantum Atlas</title>
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="The Quantum Atlas is an approachable guide to quantum physics intended for non-experts. It features cartoons, animations, interactive elements and short podcasts—a multimedia approach that we hope will enrich your exploration of the quantum world." />
                    <link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet" />
                </Helmet>
                <Routes />
                <Footer />
            </div>
        )
    }
}
