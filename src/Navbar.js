import { Outlet, Link } from "react-router-dom"

export default function Navbar() {
    return (
        <div>
            <nav>
                <Link className="nav--link" to="/">Home Page</Link>
                <Link className="nav--link" to="register">Register</Link>
                <Link className="nav--link" to="login">Login</Link>
                <Link className="nav--link" to="startpage">Start the Quiz</Link>
                <Link className="nav--link" to="addquestion">Add Question</Link>
            </nav>
            <Outlet />
        </div>
    )
}