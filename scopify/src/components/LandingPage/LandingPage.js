import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import withWidth from "@material-ui/core/withWidth"
import {withStyles} from "@material-ui/core/styles"
import {Typography, createMuiTheme, MuiThemeProvider} from "@material-ui/core"
import {AtlasLogo} from "../../assets/assetsManifest"
import { SearchRouteInput } from "../SearchProvider/SearchProvider"
import createBreakpoints from "@material-ui/core/styles/createBreakpoints"
import DrawingsLogo from "./icons-04.svg"
import {LandingPagePolygon} from "../../graphics/graphicsManifest"
import PodcastsLogo from "./icons-01.svg"
import TextLogo from "./icons-03.svg"
import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import Particles from "react-particles-js"
import getStarted from "../../assets/images/get_started.svg"
import pokeAround from "../../assets/images/poke_around.svg"
import comments from "../../assets/images/comments.svg"
import styled from "styled-components"
import { CSSTransition } from "react-transition-group";

// Generate breakpoints so we can use them in the theme definition
const breakpoints = createBreakpoints({})

// Creating a custom theme for responsive font size
const theme = createMuiTheme({
    breakpoints,
    overrides: {
        MuiTypography: {
            h3: {
                fontSize: "3em",
                fontWeight: 300,
                [breakpoints.down("md")]: {
                    fontSize: "3em",
                },
                [breakpoints.down("xs")]: {
                    fontSize: "2em",
                }
            }
        }
    },
    typography: {
        useNextVariants: true,
    }
})

const styles = theme => ({
    heading:{
        [theme.breakpoints.between("xs", "sm")]: {
            textAlign: "center"
        }
    },
    media: {
        objectFit: "cover",
    },
    divider: {
        marginTop: "5px",
        marginBottom: "15px",
    },
    paren: {
        color:"white",
        fontSize:"11em",
        display: "table",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        }
    },
    panel: {
        height: "100vh",
        minHeight: "500px",
        paddingLeft: "0px",
        paddingRight: "0px",
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down("sm")]: {
            minHeight: "600px",
            // height: "unset"
        },
        [theme.breakpoints.down("xs")]: {
            // height: "unset",
            //  minHeight: "700px",
            // paddingLeft: "0px",
            // paddingRight: "0px",
            // height: "unset"
        }
    },
    panelHeight: {
        height: "100%",
        minHeight: "800px"
    },
    panelHeadings: {
        color: "white",
        paddingTop: "40px",
        paddingBottom: "40px",
        paddingRight: "20px",
        paddingLeft: "20px",
        margin: "0 auto",
        flexGrow: "1",
        display: "flex",
        justifyContent: "center",
        maxWidth: "1200px"
    },
    particles: {
        height: "100%",
        width: "100%",
        opacity: "0.5",
    },
    panelOneWrapper: {
        display: "flex",
        position: "absolute",
        minHeight: "100%",
        height: "100%",
        flexDirection: "column",
        alignSelf: "center",
        pointerEvents: "none",
        [theme.breakpoints.down("sm")]: {
            minHeight: "700px",
            // height: "auto"
        },
        [theme.breakpoints.down("xs")]: {
            minHeight: "600px",
            // height: "auto"
        }
    },
    logo: {
        margin: "0 auto",
        flexGrow: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        width: "60%",
        maxWidth: "1200px",
        [theme.breakpoints.down("sm")]: {
            width: "80%"
        }
    },
    searchBox: {
        width: "70%",
        margin: "0 auto",
        alignItems: "flex-start",
        flexGrow: "1",
        position: "relative",
        [theme.breakpoints.down("sm")]: {
            width: "90%",
        }
    },
    iconGroup: {
        display: "flex",
        flexDirection: "column"
    },
    icon: {
        maxWidth: "100%",
        width: "150px",
    },
    iconCaption: {
        color:"white",
        fontSize:"1.5em",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1em"
        }
    },
    avatarGroup: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        margin: "auto",
        padding: "40px",
        justifyContent: "space-evenly",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "row",
            width: "100%",
            height: "100%",
            minWidth: "150px"
        }
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        height: "300px",
        width: "300px",
        backgroundColor: "white",
        [theme.breakpoints.down("sm")]: {
            height: "150px",
            width: "150px"
        }
    },
    avatarLabel: {
        paddingBottom: "20px",
        color: "white",
        fontSize: "2em",
        textAlign: "center",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.75em"
        }
    },
    avatarCaption: {
        paddingTop: "20px",
        color: "white",
        width: "300px",
        textAlign: "center",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: "1.5em",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.25em",
            paddingLeft: "10px",
            paddingRight: "10px",
            width: "200px",
            textAlign: "center",
            alignItems: "center",
        },
    }
})


const StyledGrid = styled(Grid)`
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
`
class LandingGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderedKeys: [],
            display: false
        }
    }

    componentDidMount() {
        this.setState({display: true})
    }

    render() {
        const {classes, width} = this.props
        // The default number of particles is 60, but this looks too busy on small screens
        let numParticles = 60
        if (width === "xs") {
            numParticles = 25
        }

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <div className={classes.panel} id="panel1" style={{
                        backgroundColor: "#365E7D",
                        // alignItems: "center",
                        // opacity: "0.5",
                        // backgroundImage: image,
                        // backgroundSize: "cover",
                        // backgroundPosition: "center",
                    }}>
                        <Particles className={classes.particles}
                            params={{
                                "particles": {
                                    "number": {
                                        "value": numParticles
                                    },
                                    "shape": {
                                        "type": "circle"
                                    },
                                    "size": {
                                        "value": 3
                                    },
                                    "opacity": {
                                        "value": 0.5
                                    }
                                },
                                "interactivity": {
                                    "events": {
                                        "onhover": {
                                            "enable": true,
                                            "mode": ["grab", "bubble"]
                                        }
                                    }
                                }
                            }} />
                            <CSSTransition
                                in={this.state.display}
                                timeout={350}
                                classNames="fade"
                                mountOnEnter
                                unmountOnExit
                            >
                        <div className={classes.panelOneWrapper}>
                            <div className={ classes.logo }>
                                <AtlasLogo width="100%" />
                            </div>
                            <Typography variant="h3" className={ classes.panelHeadings } style={{
                                textAlign: "center",
                                alignItems: "center"
                            }}>
                                A resource for anyone who wants to learn about quantum physics
                            </Typography>
                            
                            <div className={ classes.searchBox } onClick={() => {
                                this.setState({display: !this.state.display})}} >
                                <Link to="/search" className="no-underline">
                                    <SearchRouteInput isFilter={false} />
                                </Link>
                            </div>
                            
                        </div>

                        </CSSTransition>
                    </div>
                    <div className={`${classes.panel} ${classes.panelHeight}`} id="panel2" style={{
                        backgroundColor: "#C96654",
                    }}>
                        <Typography variant="h3" className={ classes.panelHeadings } style={{
                            textAlign: "left",
                            alignItems: "flex-end",
                        }}>
                            The Quantum Atlas is a multimedia guide to an unseen world
                        </Typography>
                        <Grid container justify="center" alignItems="center" style={{
                            width: "100%",
                            height: "auto",
                            flexGrow: "2"
                        }}>
                            <div className={ classes.paren }>
                                <span style={{verticalAlign: "middle", display: "table-cell"}}>(</span>
                            </div>
                            <div className={ classes.iconGroup }>
                                <img src={ DrawingsLogo } className={ classes.icon } />
                                <div className={ classes.iconCaption }>
                                    Drawings
                                </div>
                            </div>
                            <div className={ classes.iconGroup }>
                                <LandingPagePolygon landingPage className={ classes.icon } />
                                <div className={ classes.iconCaption }>
                                    Animations
                                </div>
                            </div>
                            <div className={ classes.iconGroup }>
                                <img src={ PodcastsLogo } className={ classes.icon }/>
                                <div className={ classes.iconCaption }>
                                    Podcasts
                                </div>
                            </div>
                            <div className={ classes.iconGroup }>
                                <img src={ TextLogo } className={ classes.icon } />
                                <div className={ classes.iconCaption }>
                                    Text
                                </div>
                            </div>
                            <div className={ classes.paren }>
                                <span style={{verticalAlign: "middle", display: "table-cell"}}>)</span>
                            </div>
                        </Grid>
                        <Typography variant="h3" className={ classes.panelHeadings } style={{
                            textAlign: "right",
                            alignItems: "flex-start",
                        }}>
                            created by a team of physicists, science communicators and illustrators.
                        </Typography>
                    </div>
                    <div className={`${classes.panel} ${classes.panelHeight}`} id="panel3" style={{
                        backgroundColor: "#68A87F",
                    }}>
                        <StyledGrid>
                            <Grid item>
                                <Grid container className={classes.avatarGroup}>
                                    <Grid item>
                                        <div className={classes.avatarLabel}>Get Started</div>
                                        <Link to="/start" style={{"textDecoration": "none"}}>
                                            <Avatar className={classes.avatar} src={getStarted}/>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <div className={classes.avatarCaption}>New to quantum? Begin your journey here!</div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container className={classes.avatarGroup}>
                                    <Grid item>
                                        <div className={classes.avatarLabel}>Poke Around</div>
                                        <Link to="/search" style={{"textDecoration": "none"}}>
                                            <Avatar className={classes.avatar} src={pokeAround}/>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <div className={classes.avatarCaption}>Just want to explore? Click here to see a list of all the entries.</div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container className={classes.avatarGroup}>
                                    <Grid item>
                                        <div className={classes.avatarLabel}>Comments?</div>
                                        <a href="https://forms.gle/LRBYBEaC3pWii5uA9" style={{"textDecoration": "none"}}>
                                            <Avatar className={classes.avatar} src={comments}/>
                                        </a>
                                    </Grid>
                                    <Grid item>
                                        <div className={classes.avatarCaption}>Have feedback for us? Please share your thoughts in a survey.</div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </StyledGrid>
                    </div>
                </div>
            </MuiThemeProvider >
        )
    }
}

LandingGrid.propTypes = {
    width: PropTypes.string.isRequired,
    classes: PropTypes.any
}

export default withStyles(styles)(withWidth()(LandingGrid))
