import QuestionCard from "./QuestionCard"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function QuestionPage(props) {
    const [localData, setLocalData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [loadedSuccessfully, setLoadedSuccessfully] = useState(true)
    const [submitted, setSubmitted] = useState(false)
    const [points, setPoints] = useState(0)
    const [update, setUpdate] = useState(0)

    useEffect(() => {
        for (let i = 0; i < 5; i++) {
            const request = {
                method: "GET",
                headers: { Accept: "application/json", "Content-Type": "application/json" }
            }
            fetch(`https://localhost:44396/api/Question/RandomQuestion?category=${props.quizData.category}`, request)
            .then(response => response.json())
            .then(dataReceived => {
                setLocalData(data => {
                    const arr = data
                    arr.push(dataReceived)
                    return arr
                })
                setLoadedSuccessfully(true)
                setUpdate(prevState => prevState + 1)
            },
            error => {
                setError(error)
                setLoadedSuccessfully(false)
            })
            .finally(() => {
                setIsLoaded(true)
            })
        }
    }, [])

    function handleSubmitButton() {
        if (!submitted) {
            setSubmitted(true)
        } else {
            props.setStartPage(prevPage => !prevPage)
        }
    }

    if (error) {
        return (
            <div>
                Error: {error.message}
                <br />
                <button className="styled-button horizontal-align longer-button" onClick={() => props.setStartPage(prevPage => !prevPage)}>Back</button>
            </div>
        )
    } else if (!isLoaded) {
        return <h4 className="loading-text">Loading...</h4>
    } else {
        const questionCards = localData.map(element => (
            <QuestionCard 
                key={element.title}
                question={element.title}
                correct_answer={element.answer}
                incorrect_answers={[element.answerOne, element.answerTwo, element.answerThree, element.answerFour]}
                submitted={submitted}
                setPoints={setPoints}
            />
        ))

        return ( 
            <main className="vertical-align">
                {questionCards}
                {submitted && <h3 className="score-text">You scored {points}/{questionCards.length}</h3>}
                <button className="styled-button horizontal-align longer-button" onClick={() => handleSubmitButton()}>{submitted ? "Play again" : "Submit answers"}</button>
                <br />
            </main>
        )
    }
}

// const [data, setData] = useState([])
// const [isLoaded, setIsLoaded] = useState(false)
// const [submitted, setSubmitted] = useState(false)
// const [points, setPoints] = useState(0)
// const {category, difficulty} = props.quizData

// const fetchURL = `https://opentdb.com/api.php?amount=5&${category && `category=${category}&`}${difficulty && `difficulty=${difficulty}&`}type=multiple`

// useEffect(() => {
//     fetch(fetchURL)
//         .then(response => response.json())
//         .then(result => (
//             setIsLoaded(true),
//             setData(result.results),
//             (error) => {
//               setIsLoaded(true);
//               setError(error);
//             }
//         ))
// }, [])

// function handleSubmitButton() {
//     if (!submitted) {
//         setSubmitted(true)
//     } else {
//         props.setStartPage(prevPage => !prevPage)
//     }
// }

// if (error) {
//     return <div>Error: {error.message}</div>;
// } else if (!isLoaded) {
//     return <h4 className="loading-text">Loading...</h4>;
// } else {
//     const questions = data.map(element => (
//         <QuestionCard 
//             key={element.question}
//             question={element.question}
//             correct_answer={element.correct_answer}
//             incorrect_answers={[...element.incorrect_answers]}
//             submitted={submitted}
//             setPoints={setPoints}
//         />
//     ))

//     return (
//         <main>
//             {questions}
//             {submitted && <h3 className="score-text">You scored {points}/{questions.length}</h3>}
//             <button className="styled-button horizontal-align longer-button" onClick={() => handleSubmitButton()}>{submitted ? "Play again" : "Submit answers"}</button>
//             <br />
//         </main>
//     )
