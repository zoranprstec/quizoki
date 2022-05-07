import { createRef, useContext, useEffect, useRef, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import { MyContext } from "./App";
import ResponsiveNavbar from "./functions/ResponsiveNavbar";

export default function Navbar(props) {
    const context = useContext(MyContext)
    const location = useLocation()
    const {pathname} = location
    const [test, setTest] = useState("nav--link")
    
    useEffect(() => {
        const nodeArray = document.querySelectorAll("a")
        for (const a of nodeArray) {
            a.className = "nav--link"
        }
        if (document.getElementById(pathname)) {
            const link = document.getElementById(pathname)
            if (pathname === link.id) {
                link.className = "nav--link active"
            } else {
                link.className = "nav--link"
            }
        }
    }, [pathname, location])

    return (
        <div>
            <nav id="myNavbar">
                <Link id="/" to="/">Home Page</Link>
                { context.access && <Link id="/startpage" className="nav--link" to="startpage">Start the Quiz</Link> }
                { context.access && <Link id="/addquestion" className="nav--link" to="addquestion">Add Question</Link> }
                <Link id="/register" className="nav--link" to="register">Register</Link>
                <Link id="/login" className="nav--link" to="login">Login</Link>
                <div className="menu-icon" onClick={ResponsiveNavbar}>
                    <i className="fa fa-bars"></i>
                </div>
            </nav>
                <button className="" onClick={props.toggleLogin}>Sign out / in</button>
            <Outlet />
        </div>
    )
}
