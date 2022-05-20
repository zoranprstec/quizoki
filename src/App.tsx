import * as React from "react"
import StartPage from "./StartPage"
import QuestionPage from "./QuestionPage"
import RegistrationPage from "./RegistrationPage"
import LoginPage from "./LoginPage"
import LogoPage from "./LogoPage"
import AddQuestionPage from "./AddQuestionPage"
import Navbar from "./Navbar"
import { useState, createContext } from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"

export const credentials = {
    logged: {
        access: true
    },
    notLogged: {
        access: false
    }
}
const themeObject = {
    theme1: {
        background: "linear-gradient(146deg, rgb(34, 192, 195) 0%, rgb(255, 224, 156) 100%)"
    },
    theme2: {
        background: "linear-gradient(146deg, rgb(0, 0, 0) 0%, rgb(255, 224, 156) 100%)"
    }
}

export const MyContext = createContext(
    credentials.notLogged
)

export default function App () {
    const [login, setLogin] = useState(credentials.notLogged)
    const [theme, setTheme] = useState(themeObject.theme2)
    const [startPageActive, setStartPageActive] = useState<boolean>(true)
    const [quizData, setQuizData] = useState({
        category: ""
    })

    function toggleLogin() {
        setLogin(prevState => prevState.access === true ? credentials.notLogged : credentials.logged)
    }
    
    const startpage = startPageActive ? 
    <StartPage 
        quizData={quizData} 
        setQuizData={setQuizData} 
        startPageActive={startPageActive} 
        setStartPageActive={setStartPageActive} 
    /> :
    <QuestionPage 
        setStartPage={setStartPageActive} 
        quizData={quizData} 
    />

    return (
        <MyContext.Provider value={login}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar toggleLogin={toggleLogin} />}>
                        <Route index element={<LogoPage />} />
                        <Route path="register" element={<RegistrationPage />} />
                        <Route path="login" element={<LoginPage toggleLogin={toggleLogin} />} />
                        <Route path="startpage" element={startpage} />
                        <Route path="addquestion" element={<AddQuestionPage />} />
                        <Route path="*" element={<h2 style={{paddingLeft: "1rem"}}>Uh-oh... wrong address!</h2>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    )
}