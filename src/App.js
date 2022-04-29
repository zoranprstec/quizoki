import StartPage from "./StartPage"
import QuestionPage from "./QuestionPage"
import RegistrationPage from "./RegistrationPage"
import LoginPage from "./LoginPage"
import LogoPage from "./LogoPage"
import AddQuestionPage from "./AddQuestionPage"
import Navbar from "./Navbar"
import { useState, useEffect, createContext } from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"

export const MyContext = createContext("default value")

export default function App () {
    const [startPageActive, setStartPageActive] = useState(true)
    const [quizData, setQuizData] = useState({
        category: ""
    })

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
        <MyContext.Provider value={"provided value"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<LogoPage />} />
                        <Route path="register" element={<RegistrationPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="startpage" element={startpage} />
                        <Route path="addquestion" element={<AddQuestionPage />} />
                        {/* <Route path="questionpage" element={<QuestionPage quizData={quizData} setQuizData={setQuizData} />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    )
}