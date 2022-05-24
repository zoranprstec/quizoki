import * as React from "react"
import { useNavigate } from "react-router-dom";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Button from "@kiwicom/orbit-components/lib/Button";

export default function LogoPage() {
    let navigate = useNavigate();
    
    function registerButton() {
        navigate("/register", { replace: false })
    }

    function loginButton() {
        navigate("/login", { replace: false })
    }

    return (
        <div className="vertical-center">
            <img src="logo192.png" title="logo" />
            <Heading as="h1" type="display">quiZoMania</Heading>
            <div className="flex-row-to-col">
                <Button title="register" onClick={registerButton} circled={true}>Register</Button>
                <Button title="login" onClick={loginButton} circled={true}>Login</Button>
            </div>
        </div>
    )
}