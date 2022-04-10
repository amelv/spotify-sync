import React, {createContext, Dispatch, SetStateAction} from "react"

export interface AuthContextState {
    loggedIn: boolean,
    accessToken: string,
    setToken: Dispatch<SetStateAction<string>>
    setLoggedIn: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextState>({
    loggedIn: false,
    accessToken: "",
    setToken: () => {},
    setLoggedIn: () => {}
})

export {AuthContext}
