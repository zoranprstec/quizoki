import * as React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface LoginPageProps {
    toggleLogin: () => void
}

export default function LoginPage({ toggleLogin }: LoginPageProps) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [localData, setLocalData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(true)
    const [loadedSuccessfully, setLoadedSuccessfully] = useState(false)

    const navigate = useNavigate()

    function handleChange(event: { target: { value: string; name: string } }) {
        const {value, name} = event.target
        setFormData(prevData => (
            {
                ...prevData,
                [name]: value
            }
        ))
    }
    
    function submit(event: { preventDefault: () => void }) {
        const request = {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                Email: formData.email,
                Password: formData.password
            })
        }
        
        setIsLoaded(false)
        
        fetch("https://localhost:44396/api/Auth/login", request)
            .then(response => response.json())
            .then(data => {
                setIsLoaded(true)
                setLocalData(data)
                setLoadedSuccessfully(true)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
                setLoadedSuccessfully(false)
                alert(error.message)
            })
            
            event.preventDefault()
    }

    useEffect(() => {
        if (loadedSuccessfully && localData!["successfull"]) {
            toggleLogin()
            navigate("/startpage", { replace: false })
        }
    }, [loadedSuccessfully])

        
    return (
        <div className="registration">
            <form onSubmit={submit} className="form-container">
                <input
                    className="form-input"
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                ></input>
                <br />
                <input
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                ></input>
                <br />
                <input
                    className="styled-button"
                    type="submit"
                ></input>
                <br />
            </form>
            <hr className="vertical-line" />
            <div className="welcome-text-container">
                <h2>Welcome back!</h2>
                <p>Please login so you can start answering some questions!</p>
            </div>
            {!isLoaded && <div>Loading...</div>}
        </div>
    )
}