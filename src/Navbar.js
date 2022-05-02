import { useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import { MyContext } from "./App";

export default function Navbar(props) {
    const context = useContext(MyContext)

    return (
        <div>
            <nav>
                <Link className="nav--link" to="/">Home Page</Link>
                <Link className="nav--link" to="register">Register</Link>
                <Link className="nav--link" to="login">Login</Link>
                { context.access && <Link className="nav--link" to="startpage">Start the Quiz</Link> }
                { context.access && <Link className="nav--link" to="addquestion">Add Question</Link> }
                <button onClick={props.toggleLogin}>Sign out / in</button>
            </nav>
            <Outlet />
        </div>
    )
}