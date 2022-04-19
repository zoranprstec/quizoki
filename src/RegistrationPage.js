import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    function updateForm(event) {
        const {value, name} = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    // const requestOptions = { 
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //         UserName: "bitch"
    //     })
    // }
    
    // useEffect(() => {
    //     fetch("https://reqres.in/api/posts", requestOptions)
    //         .then(response => response.json())
    //         .then((data) => console.log(data))
    // }, [])
    
    function sendDataToMP(event) {
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "no-cors",
            body: JSON.stringify({
                UserName: formData.userName,
                Email: formData.email,
                Password: formData.password ,
                ConfirmPassword: formData.confirmPassword
            })
        }
        
        fetch("http://localhost:44396", request)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))

        console.log("submitted")
        event.preventDefault()
    }

    return (
        <div className="registration">
            <form onSubmit={sendDataToMP} /*action="44396" method="POST"*/ >
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
        </div>
    )
}