import { createRef, useContext, useRef, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import { MyContext } from "./App";
import ResponsiveNavbar from "./functions/ResponsiveNavbar";

export default function Navbar(props) {
    const context = useContext(MyContext)
    // const location = useLocation()
    // // console.log(location)
    // const {pathname} = location
    // const myRef = useRef(null)

    // if(pathname )


    // const classList = "nav--link " + 

    return (
        <div>
            <nav id="myNavbar">
                <Link id="/" className="nav--link" to="/">Home Page</Link>
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
