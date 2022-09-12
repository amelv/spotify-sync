import axios from "axios"
import { useEffect } from "react"
import { useStore, useHydration } from "../store"


export const useTokenRefresh = () => {
    const isHydrated = useHydration()
    const {refresh, expiresIn, expiresAt} = useStore((store) => store.tokens)
    const setTokens = useStore((store) => store.setTokens)

    useEffect(() => {
        if (!isHydrated || !refresh || !expiresAt) {
            return;
        }

        const refreshCallback = async () => {
            try {
            const {data} = await axios({url: `${process.env.REACT_APP_REFRESH_URI}?refresh_token=${refresh}`, method: 'GET'})

            console.log(data)
            if (data.access_token) {
                console.log('setting stuff')
                console.log(expiresIn)
                setTokens({access: data.access_token, refresh, expiresIn, expiresAt: new Date(Date.now() + (Number(expiresIn) - 60) * 1000)})
                console.log(new Date(Date.now() + (Number(expiresIn) - 60) * 1000))
            }
            } catch (error) {
                if (process.env.REACT_APP_LOGIN_URI) {
                    window.location.replace(process.env.REACT_APP_LOGIN_URI)
                }
            }
        }

        if (expiresAt && Date.now() >= expiresAt.getTime()) {
            refreshCallback();
        }
    }, [refresh, expiresIn, expiresAt, setTokens, isHydrated])
}