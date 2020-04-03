import React, {Suspense, lazy} from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import Loading from "./components/Loading/Loading"
import "semantic-ui-css/semantic.min.css"

import {Scopify} from "./components/Scopify"

ReactDOM.render((
    <BrowserRouter>
        <React.Fragment>
            <Suspense fallback={<Loading/>}>
					    <Scopify />
            </Suspense>
        </React.Fragment>
    </BrowserRouter>
), document.getElementById("root"))
