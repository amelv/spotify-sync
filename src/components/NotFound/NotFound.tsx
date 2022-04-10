import React from "react"
import styled from "styled-components"

const OuterWrapper = styled.div.attrs({
    className : "atlasWidth"
})`
    width: 100%;
    height: 100%;
    zoom: 1;
    margin-right: auto; 
    margin-left: auto;
    padding-top: 100px;
    @media screen and (min-width: 60em) {
        padding: 2rem;
        padding-top: 100px;
    }
`

const InnerWrapper = styled.div`
    width: 90%;
    height: 100%;
    margin-right: auto; 
    margin-left: auto;

    margin-top: 0;

    @media screen and (min-width: 60em) {
        width: 100%;
        display: inline;
        padding: 0;
    }

    @media screen and (min-width: 30em) {
        padding-right: 1rem;
        padding-left: 1rem;
    }
`

const NotFound = () =>
    (
        <OuterWrapper>
            <InnerWrapper>
                <h2>No, it's not interference from the quantum world.</h2>
                <p>We just don't have a page that lives at this address.</p>
      
            </InnerWrapper>
        </OuterWrapper>
    )
export default NotFound