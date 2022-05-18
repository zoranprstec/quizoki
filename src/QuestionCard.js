import he from "he"                         // library za dekodiranje &quot; i sličnih gluposti
import {useState, useEffect} from "react"

export default function QuestionCard(props) {
    const { answerOne, answerTwo, answerThree, answerFour, answer, title } = props.elements
    const incorrect_answers = [answerOne, answerTwo, answerThree, answerFour]
    const correct_answer = answer
    const question = title
    const [answerData, setAnswerData] = useState({
        [question]: ""                            // question: answer (malo čudno, znam; to je ono selectano)
    })
    const [answersArray, setAnswersArray] = useState(() => initializeArray())
    const {[question]: selectedAnswer} = answerData
    
    function initializeArray() {
        const answersArray = incorrect_answers
        answersArray.push(correct_answer)
        return answersArray.sort()
    }

    function handleChange(event) {
        const {value, name} = event.target
        setAnswerData(prevAnswers => {
            return {
                ...prevAnswers,
                [name]: value
            }
        })
    }


    let isCorrect = false

    useEffect(() => {
        isCorrect && props.setPoints(prevState => prevState + 1)
    }, [props.submitted])
    
    const showAnswers = answersArray.map (
        element => {
            const selectedClass = selectedAnswer === element ? "form-control-selected" : "form-control"
            const correctClass = "form-control-correct"
            const incorrectClass = "form-control-incorrect"
            let submittedClass = ""

            if (correct_answer === element) {
                submittedClass = correctClass
                if(selectedAnswer === element) {
                    isCorrect = true
                }
            } else if (selectedAnswer === element && correct_answer !== element) {
                submittedClass = incorrectClass
            } else {
                submittedClass = "form-control"
            }

            return (
                <label key={Math.random()} className={props.submitted ? submittedClass : selectedClass}>
                    <input
                        disabled={props.submitted}
                        key={element}
                        type="radio"
                        id={element}
                        name={question}
                        value={element}
                        checked={selectedAnswer === element}
                        onChange={handleChange}
                    />
                    {he.decode(element)}
                </label>
            )}
    )

    const decodedQuestion = he.decode(question)

    return (
        <section>
            <h2 className="question">{decodedQuestion}</h2>
            <div className="answers-row">
                {showAnswers}
            </div>
            <hr className="line"/>
        </section>
    )
}