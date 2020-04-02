import React from 'react'

const AuthContext = React.createContext({
  loggedIn: false,
  accessToken: '',
  setToken: () => {}
})

export {AuthContext}
