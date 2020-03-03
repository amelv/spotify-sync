import React from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import {fade} from "@material-ui/core/styles/colorManipulator"
import {withStyles} from "@material-ui/core/styles"
import MoreIcon from "@material-ui/icons/MoreVert"
import Button from "@material-ui/core/Button"
import {Link} from "react-router-dom"
import { HeaderSearch } from "../SearchProvider/SearchProvider"
import {AtlasLogo} from "../../assets/assetsManifest"
import {withRouter} from "react-router-dom"


const styles = theme => ({
    root: {
        width: "100%",
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    button: {
        fontSize: "1rem",
        fontWeight: 600,
        width: "100%",
        whiteSpace: "nowrap",
    },
    title: {
        display: "block",
        [theme.breakpoints.down("sm")]: {
            // marginLeft: "-50px"
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(2),
        marginLeft: 0,
      width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    sectionDesktop: {
      display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
          alignItems: "center",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
})

class PrimarySearchAppBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
          opacity: 0.75, 
        }

    }

    handleProfileMenuOpen = event => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null})
        this.handleMobileMenuClose()
    };

    handleMobileMenuOpen = event => {
        this.setState({mobileMoreAnchorEl: event.currentTarget})
    };

    handleMobileMenuClose = () => {
        this.setState({mobileMoreAnchorEl: null})
    };


    render() {
        const {anchorEl, mobileMoreAnchorEl} = this.state
        const {classes} = this.props
        const isMenuOpen = Boolean(anchorEl)
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                transformOrigin={{vertical: "top", horizontal: "right"}}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>
                    <Link to="/start" style={{textDecoration: "none", color: "black"}}>
                        <p size="large">Get Started</p>
                    </Link>
                </MenuItem>
                <MenuItem onClick={this.handleMenuClose}>
                    <Link to="/search" style={{textDecoration: "none", color: "black"}}>
                        <p size="large">All Entries</p>
                    </Link>
                </MenuItem>
                {/*global ENV:true*/}
                { ENV === "dev" && 
                <MenuItem onClick={this.handleMenuClose}>
                    <Link to="/graphics" style={{textDecoration: "none", color: "black"}}>
                        <p size="large">Gallery</p>
                    </Link>
                </MenuItem>
                }
                <MenuItem onClick={this.handleMenuClose}>
                    <a href="https://forms.gle/LRBYBEaC3pWii5uA9" target="_" style={{textDecoration: "none", color: "black"}}>
                        <p size="large">Feedback</p>
                    </a>
                </MenuItem>
                <MenuItem onClick={this.handleMenuClose}>
                    <Link to="/about" style={{textDecoration: "none", color: "black"}}>
                        <p size="large">About</p>
                    </Link>
                </MenuItem>
            </Menu>
        )

        return (
            <div className={classes.root}>
                <AppBar position="fixed" style={{background: "#ffffff", opacity: this.state.opacity}}>
                    <Toolbar>
                        {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                        <MenuIcon />
                      </IconButton> */}
                        <div className={classes.title}>
                            <Link to="/" style={{textDecoration: "none"}}>
                                <AtlasLogo icon width="40px" color="black" />
                            </Link>
                        </div>


                        <div className={classes.grow}>
                        </div>
                        <div className={classes.sectionDesktop}>
                            <Link to="/start" style={{textDecoration: "none"}}>
                                <Button size="large" className={classes.button}>Get Started</Button>
                            </Link>
                            <Link to="/search" style={{textDecoration: "none"}}>
                                <Button size="large" className={classes.button}>All Entries</Button>
                            </Link>
                            {/*global ENV:true*/}
                            { ENV === "dev" && 
                            <Link to="/graphics" style={{textDecoration: "none"}}>
                                <Button size="large" className={classes.button}>Gallery</Button>
                            </Link>
                            
                            }
                            <a href="https://forms.gle/LRBYBEaC3pWii5uA9" target="_" style={{textDecoration: "none"}}>
                                <Button size="large" className={classes.button}>Feedback</Button>
                            </a>
                            <Link to="/about" style={{textDecoration: "none"}}>
                                <Button size="large" className={classes.button}>About</Button>
                            </Link>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen}>
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </div>
        )
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(PrimarySearchAppBar))
