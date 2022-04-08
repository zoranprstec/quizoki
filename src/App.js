import StartPage from "./StartPage"
import QuestionPage from "./QuestionPage"
import {useState, useEffect} from "react"

export default function App () {
    const [startPageActive, setStartPageActive] = useState(true)
    const [quizData, setQuizData] = useState({
        category: "",
        difficulty: ""
    })

    return (
        <div>
            {startPageActive && <StartPage setStartPage={setStartPageActive} quizData={quizData} setQuizData={setQuizData} />}
            {!startPageActive && <QuestionPage setStartPage={setStartPageActive} quizData={quizData} />}
        </div>
    )
}