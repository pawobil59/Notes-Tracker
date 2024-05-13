import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form ({route, method}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    //name of method being used (if name is login, use Login else use Register)
    const name = method === "login" ? "Login" : "Register"

    //prevent the form from being submitted & remove default behaviour of reloading the page
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
    
    //make a request, if method is login, get the access and refresh token and set them
    //if this fails then we catch the error
        try{
            const res = await api.post(route, { username, password })
            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.REFRESH_TOKEN)
                navigate("/")
            }else{
                navigate("/login")
            }

        }catch(error){
            alert(error)
        }finally{
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} //set username to value "e" that is typed here
            placeholder="Username"
        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} //set password to value "e" that is typed here
            placeholder="Password"
        />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>

}

export default Form
