import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {withRouter} from "react-router-dom"
import { Menu } from 'semantic-ui-react'

const Header = (props) => {
  const [activeItem, setActive] = useState('home')

  const handleItemClick = (e, { name }) => setActive(name)
  
  return (
    <Menu style={{height: "7vh"}} inverted>
      <Menu.Item
          as={ Link }
          to='/'
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        <Menu.Item
          as={ Link }
          to='/settings'
          name='settings'
          active={activeItem === 'settings'}
          onClick={handleItemClick}
        />
       <Menu.Item
          as={ Link }
          to='/about'
          name='about'
          active={activeItem === 'about'}
          onClick={handleItemClick}
        />
      </Menu>
  )
}

Header.propTypes = {
}

export default withRouter(Header)
