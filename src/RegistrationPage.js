import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

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
    const [isLoaded, setIsLoaded] = useState(true)
    const [error, setError] = useState(null)
    const [loadedSuccessfully, setLoadedSuccessfully] = useState(false)

    const navigate = useNavigate()

    function updateForm(event) {
        const {value, name} = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    
    function sendDataToMP(event) {
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

        console.log("submit function")

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
                setError(error)
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
                <form onSubmit={sendDataToMP} className="form-container" >
                    <input
                        className="form-input"
                        type="text"
                        placeholder="User Name"
                        name="userName"
                        value={formData.userName}
                        onChange={updateForm}
                    ></input>
                    <br />
                    <input
                        className="form-input"
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        value={formData.email}
                        onChange={updateForm}
                    ></input>
                    <br />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={updateForm}
                    ></input>
                    <br />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={updateForm}
                    ></input>
                    <br />
                    <input
                        type="submit"
                        className="styled-button longer-button"
                    ></input>
                    <br />
                </form>
                <hr className="vertical-line" />
                <div className="welcome-text-container">
                    <h2>Welcome!</h2>
                    <p>Please register so you can start answering some questions!</p>
                </div>
            </div>
            {!isLoaded && <div>Loading...</div>}
        </div>
    )
}