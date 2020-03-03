import React, {Suspense, lazy} from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import Loading from "./components/Loading/Loading"
import "./index.css"
import {StylesProvider, createGenerateClassName} from "@material-ui/core/styles"

const generateClassName = createGenerateClassName({
	productionPrefix: 'p',
})

const Scopify = lazy(() => import("./components/Scopify"))

ReactDOM.render((
    <BrowserRouter>
        <React.Fragment>
            <GlobalStyle />
            <Suspense fallback={<Loading/>}>
				<StylesProvider generateClassName={generateClassName}>
					<Scopify />
				</StylesProvider>
            </Suspense>
        </React.Fragment>
    </BrowserRouter>
), document.getElementById("root"))
