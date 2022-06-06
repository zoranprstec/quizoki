import * as React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Text from "@kiwicom/orbit-components/lib/Text"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Button from "@kiwicom/orbit-components/lib/Button"

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [localData, setLocalData] = useState({
        successfull: ""
    })
    const [loadedSuccessfully, setLoadedSuccessfully] = useState<boolean>(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(true)
    // const [error, setError] = useState<any>(null)

    const navigate = useNavigate()

    function updateForm(event: { target: { value: string; name: string } }) {
        const {value, name} = event.target
        setFormData((prevData: any) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    
    function handleSubmit(event: { preventDefault: () => void }) {
        const request = {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                UserName: formData.userName,
                Email: formData.email,
                Password: formData.password ,
                ConfirmPassword: formData.confirmPassword
            })
        }

        setIsLoaded(false)
        
        fetch("https://localhost:44396/api/Auth/register", request)
            .then(response => response.json())
            .then(data => {
                setIsLoaded(true)
                setLocalData(data)                                  // ovo se zapiše u state tek prilikom početka sljedećeg rendera
                setLoadedSuccessfully(true)
            },
            error => {
                setIsLoaded(true)
                // setError(error)
                setLoadedSuccessfully(false)
                alert(error.message)
            })
        
        event.preventDefault()
    }
    
    useEffect(() => {
        if (localData.successfull) {
            navigate("/startpage", { replace: false })
        }
    }, [loadedSuccessfully])

    return (
        <div>
            <div className="registration">
                <form onSubmit={handleSubmit} className="form-container" >
                    <input
                        className="form-input"
                        type="text"
                        placeholder="User Name"
                        name="userName"
                        value={formData.userName}
                        onChange={updateForm}
                        required
                        />
                    <br />
                    <input
                        className="form-input"
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        value={formData.email}
                        onChange={updateForm}
                        required
                    />
                    <br />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={updateForm}
                        required
                    />
                    <br />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={updateForm}
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
                    <Heading spaceAfter="largest" as="h2" type="display">Welcome!</Heading>
                    <Text size="large">Please register so you can start answering some questions!</Text>
                </div>
            </div>
            {!isLoaded && <div>Loading...</div>}
        </div>
    )
}