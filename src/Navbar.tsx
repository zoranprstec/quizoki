import * as React from "react"
import { useContext, useEffect } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { MyContext } from "./App"
import ResponsiveNavbar from "./functions/ResponsiveNavbar"
import Button from "@kiwicom/orbit-components/lib/Button"

interface NavbarProps {
    toggleLogin: () => void
}

export default function Navbar({ toggleLogin }: NavbarProps) {
    const context = useContext(MyContext)
    const location = useLocation()
    const {pathname} = location

    useEffect(() => {
        const nodeArray = document.querySelectorAll("a")
        for (const a of nodeArray) {
            a.className = "nav--link"
        }
        if (document.getElementById(pathname)) {
            const link = document.getElementById(pathname)
            if (pathname === link!.id) {
                link!.className = "nav--link active"
            } else {
                link!.className = "nav--link"
            }
        }
    }, [pathname, location])
    
    return (
        <div id="main">
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
            <Button onClick={toggleLogin} circled={true}>Sign out / in (debug)</Button>
            {/* <button className="" onClick={ResponsiveSidebar}>Themes</button>
            <div id="sidebarId" className="sidebar">
            <div className="sidebar--btn" onClick={chooseTheme}>Light</div>
            <div className="sidebar--btn" onClick={chooseTheme}>Dark</div>
        </div> */}
            <Outlet />
        </div>
    )
}

// function chooseTheme(event: any) {
//     console.log(event)
// }