/*global ENV:true*/
import React, {lazy, Suspense} from "react"
import {Switch, Route, withRouter} from "react-router-dom"
import Loading from "./Loading/Loading"
const NotFound = lazy(() => import ( "./NotFound/NotFound"))
const LandingPage = lazy(() => import("./LandingPage/LandingPage"))
const GeneratorPage = lazy(() => import("./GeneratorPage/GeneratorPage"))

export const Routes = () => {
   return (
            <Suspense fallback={<Loading/>}>
                <Switch>
                    <Route exact path='/scopify' component={() =>  <LandingPage />} />
                    <Route exact path='/scopify/settings' component={() =>  <GeneratorPage />} />
                    <Route path='/scopify/step:num' component={withRouter(GeneratorPage)} />
                    <Route component={() => <NotFound />} />
                </Switch>
            </Suspense>
    )
}
