import * as React from "react"
import StartPage from "./StartPage"
import QuestionPage from "./QuestionPage"
import RegistrationPage from "./RegistrationPage"
import LoginPage from "./LoginPage"
import LogoPage from "./LogoPage"
import AddQuestionPage from "./AddQuestionPage"
import Navbar from "./Navbar"
import NoMatch from "./NoMatch"
import { useState, createContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export const credentials = {
    logged: {
        access: true
    },
    notLogged: {
        access: false
    }
}

export const MyContext = createContext(
    credentials.notLogged
)

export default function App () {
    const [login, setLogin] = useState(credentials.notLogged)
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
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    )
}