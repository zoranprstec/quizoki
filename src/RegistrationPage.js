import { useState } from "react"

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    console.log(formData)

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
        console.log("data sent")
    }

    return (
        <div className="registration">
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
        </div>
    )
}