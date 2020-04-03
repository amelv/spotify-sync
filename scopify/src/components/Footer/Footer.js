import React from "react"
import {withRouter} from "react-router-dom"
import {Container} from "semantic-ui-react"

const Footer = (props) => {

    return(
        <Container>
            <p> Provider by @amelv </p>
        </Container>
    )
} 

export default withRouter(Footer)
