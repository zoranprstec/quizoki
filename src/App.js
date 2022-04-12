import StartPage from "./StartPage"
import QuestionPage from "./QuestionPage"
import RegistrationPage from "./RegistrationPage"
import {useState, useEffect} from "react"

export default function App () {
    const [startPageActive, setStartPageActive] = useState(true)
    const [quizData, setQuizData] = useState({
        category: "",
        difficulty: ""
    })

    return (
        <div>
            <RegistrationPage />
            {/* {startPageActive ? 
                <StartPage setStartPage={setStartPageActive} quizData={quizData} setQuizData={setQuizData} /> :
                <QuestionPage setStartPage={setStartPageActive} quizData={quizData} />
            } */}
        </div>
    )
}