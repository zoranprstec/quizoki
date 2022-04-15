import StartPage from "./StartPage"
import QuestionPage from "./QuestionPage"
import RegistrationPage from "./RegistrationPage"
import LogoPage from "./LogoPage"
import {useState, useEffect} from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"

export default function App () {
    const [startPageActive, setStartPageActive] = useState(true)
    const [quizData, setQuizData] = useState({
        category: "",
        difficulty: ""
    })

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Outlet />} />
                    <Route index element={<LogoPage />} />
                    <Route path="register" element={<RegistrationPage />} />
                    <Route path="startpage" element={<StartPage />} />
            </Routes>
        </BrowserRouter>
    )
}

{/* <div>
    <RegistrationPage /> }
    { {startPageActive ? 
        <StartPage setStartPage={setStartPageActive} quizData={quizData} setQuizData={setQuizData} /> :
        <QuestionPage setStartPage={setStartPageActive} quizData={quizData} />
    }
</div> */}