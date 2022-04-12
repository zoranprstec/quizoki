import QuestionCard from "./QuestionCard"
import {useState, useEffect} from "react"

export default function QuestionPage(props) {
    const [error, setError] = useState(null);
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [points, setPoints] = useState(0)
    const {category, difficulty} = props.quizData

    const fetchURL = `https://opentdb.com/api.php?amount=5&${category && `category=${category}&`}${difficulty && `difficulty=${difficulty}&`}type=multiple`

    useEffect(() => {
        fetch(fetchURL)
            .then(response => response.json())
            .then(result => (
                setIsLoaded(true),
                setData(result.results),
                (error) => {
                  setIsLoaded(true);
                  setError(error);
                }
            ))
    }, [])

    function handleSubmitButton() {
        if (!submitted) {
            setSubmitted(true)
        } else {
            props.setStartPage(prevPage => !prevPage)
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <h4 className="loading-text">Loading...</h4>;
    } else {
        const questions = data.map(element => (
            <QuestionCard 
                key={element.question}
                question={element.question}
                correct_answer={element.correct_answer}
                incorrect_answers={[...element.incorrect_answers]}
                submitted={submitted}
                setPoints={setPoints}
            />
        ))

        return (
            <main>
                {questions}
                {submitted && <h3 className="score-text">You scored {points}/{questions.length}</h3>}
                <button className="submit-button" onClick={() => handleSubmitButton()}>{submitted ? "Play again" : "Submit answers"}</button>
                <br />
            </main>
        )
    }
}