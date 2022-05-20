import * as React from "react"
import { useNavigate } from "react-router-dom";

export default function LogoPage() {
    let navigate = useNavigate();

    interface handleButtonProps {
        target: any
    }
    
    function handleButton({target}: handleButtonProps) {
        console.log(target)
        const {id} = target
        navigate(`/${id}`, { replace: false })
    }

    return (
        <div className="vertical-center">
            <img src="logo192.png" title="logo" />
            <h1>Logo Page</h1>
            <div className="flex-row-to-col">
                <button className="styled-button" id="register" onClick={handleButton}>Register</button>
                <button className="styled-button" id="login" onClick={handleButton}>Login</button>
            </div>
        </div>
    )
}