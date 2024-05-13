import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

//load protected route, call auth method to check if a refresh token is needed, if it is, call 
//refresh token method to update value from the backend

function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])
    
    //automatically refresh the access token
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        //get the refresh token and send a response to the below route to geta new access token
        try{
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            //if successfull, update access token and setIsAuthorized to true
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        }
        catch(error){
            console.log(error)
            setIsAuthorized(false)
        }

    }
    //function to check if we need to refresh the token
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token){
            setIsAuthorized(false)
            return
        }

        const decoded = jwtDecode(token)//decode jwt token
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        //if token is expired, wait for the refresh token else setIsAuthorized to true if otherwise
        if (tokenExpiration < now){
            await refreshToken()
        }else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized == null){
        return <div>Loading..</div>
    }

    //return children route that is wrapped if authorized otherwise return Navigate component which will go to the login route
    return isAuthorized ? children : <Navigate to ="/login"/> 
}

export default ProtectedRoute