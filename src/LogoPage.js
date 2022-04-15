import { Link } from "react-router-dom";

export default function LogoPage() {
    return (
        <div className="logo-page">
            <img src="logo192.png" />
            <h1>Logo Page</h1>
            <Link to="/register">Login / Register</Link>
        </div>
    )
}