import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function LogoPage() {
    let navigate = useNavigate();
    
    function handleButton(event) {
        const {id} = event.target
        navigate(`/${id}`, { replace: false })
    }

    return (
        <div className="vertical-center">
            <img src="logo192.png" />
            <h1>Logo Page</h1>
            <button className="styled-button" id="register" onClick={handleButton}>Register</button>
            <button className="styled-button" id="login" onClick={handleButton}>Login</button>
        </div>
    )
}