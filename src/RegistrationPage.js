import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [data, setData] = useState(null)
    const [isLoaded, setIsLoaded] = useState(true)
    const [error, setError] = useState(null)
    const [loadedSuccessfully, setLoadedSuccessfully] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (data) {

        }
    }, [data])

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

        setIsLoaded(false)
        
        fetch("https://localhost:44396/api/Auth/register", request)
            .then(response => response.json())
            .then(data => {
                setIsLoaded(true)
                setData(data)
                setLoadedSuccessfully(true)
            },
            error => {
                setIsLoaded(true)
                setError(error)
                setLoadedSuccessfully(false)
                alert(error.message)
            })

        event.preventDefault()

        if (loadedSuccessfully && data.successfull) {
            navigate("/startpage", { replace: false })
        }
    }

    return (
        <div className="registration">
            <form onSubmit={sendDataToMP} >
                <input
                    type="text"
                    placeholder="User Name"
                    name="userName"
                    value={formData.userName}
                    onChange={updateForm}
                ></input>
                <br />
                <input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={formData.email}
                    onChange={updateForm}
                ></input>
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={updateForm}
                ></input>
                <br />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={updateForm}
                ></input>
                <br />
                <input
                    type="submit"
                ></input>
                <br />
            </form>
            {!isLoaded && <div>Loading...</div>}
        </div>
    )
}