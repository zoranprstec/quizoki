import * as React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Text from "@kiwicom/orbit-components/lib/Text"
import Button from "@kiwicom/orbit-components/lib/Button"

interface LoginPageProps {
    toggleLogin: () => void
}

export default function LoginPage({ toggleLogin }: LoginPageProps) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [localData, setLocalData] = useState(null)
    // const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(true)
    const [loadedSuccessfully, setLoadedSuccessfully] = useState(false)

    const navigate = useNavigate()


    function handleChange(event: React.SyntheticEvent<HTMLInputElement, Event> ) {
        const {value, name} = event.target as HTMLInputElement
            // bez "as HTMLInputElement" TS ne zna da radimo s Input elementom pa ne može
            // znati da "value, name" postoje u event.target. 
        setFormData(prevData => (
            {
                ...prevData,
                [name]: value
            }
        ))
    }
    
    function handleSubmit(event: { preventDefault: () => void }) {
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
                // setError(error)
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
        <div>
            <div className="registration">
                <form onSubmit={handleSubmit} className="form-container">
                    <input
                        className="form-input"
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    <br />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <div className="flex-row-to-col">
                        <Button submit={true} circled={true}>Submit</Button>
                    </div>
                    <br />
                </form>
                <hr className="vertical-line" />
                <div className="welcome-text-container">
                    <Heading spaceAfter="largest" as="h2" type="display">Welcome back!</Heading>
                    <Text size="large">Please login so you can start answering some questions!</Text>
                </div>
            </div>
            {!isLoaded && <div>Loading...</div>}
        </div>
    )
}