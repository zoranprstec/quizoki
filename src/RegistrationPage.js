import { useEffect, useState } from "react"

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
    
    function sendDataToMP() {
        const request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            mode: "cors",
            body: JSON.stringify({
                UserName: formData.userName,
                Email: formData.email,
                Password: formData.password ,
                ConfirmPassword: formData.confirmPassword
            })
        }

        fetch("https://localhost:44396/register", request)
            .then(response => response.json())
            .then(data => console.log(data))
    }

    return (
        <div className="registration">
            <form action="register" method="POST">
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
                    onClick={sendDataToMP}
                ></input>
                <br />
            </form>
        </div>
    )
}