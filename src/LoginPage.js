import { useState } from "react"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    function handleChange(event) {
        const {value, name} = event.target
        setFormData(prevData => (
            {
                ...prevData,
                [name]: value
            }
        ))
    }

    function submit(event) {
        const request = {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                Email: formData.email,
                Password: formData.password
            })
        }
        
        fetch("https://localhost:44396/api/Auth/login", request)
            .then(response => response.json())
            .then(data => (
                setData(data),
                (error) => {
                    setError(error);
                }
            ))
        event.preventDefault()
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    ></input>
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                ></input>
                <br />
                <input
                    type="submit"
                ></input>
                <br />
                {error && <div>Error: {error.message}</div>}
            </form>
        </div>
    )
}