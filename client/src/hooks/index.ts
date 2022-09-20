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

        let refreshIsCancelled = false;

        const refreshCallback = async () => {
            try {
            const {data} = await axios({url: `${process.env.REACT_APP_REFRESH_URI}?refresh_token=${refresh}`, method: 'GET'})

                if (!refreshIsCancelled && data.access_token) {
                    setTokens({access: data.access_token, refresh, expiresIn, expiresAt: new Date(Date.now() + ((Number(expiresIn) - 60) * 1000))})
                }
            } catch (error) {
                if (!refreshIsCancelled && process.env.REACT_APP_LOGIN_URI) {
                    window.location.replace(process.env.REACT_APP_LOGIN_URI)
                }
            }
        }

        if (expiresAt && Date.now() >= expiresAt.getTime()) {
            refreshCallback();
        }
        return () => {
            refreshIsCancelled = true
        }
    }, [refresh, expiresIn, expiresAt, setTokens, isHydrated])
}