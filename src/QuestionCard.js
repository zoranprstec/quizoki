import he from "he"                         // library za dekodiranje &quot; i sličnih gluposti
import {useState, useEffect} from "react"

export default function QuestionCard(props) {
    const [answerData, setAnswerData] = useState({
        [props.question]: ""                            // question: answer (malo čudno, znam; to je ono selectano)
    })
    const [answersArray, setAnswersArray] = useState(() => initializeArray())
    const {[props.question]: answer} = answerData
    
    function initializeArray() {
        const answersArray = props.incorrect_answers
        answersArray.push(props.correct_answer)
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
            const selectedClass = answer === element ? "form-control-selected" : "form-control"
            const correctClass = "form-control-correct"
            const incorrectClass = "form-control-incorrect"
            let submittedClass = ""

            if (props.correct_answer === element) {
                submittedClass = correctClass
                if(answer === element) {
                    isCorrect = true
                }
            } else if (answer === element && props.correct_answer !== element) {
                submittedClass = incorrectClass
            } else {
                submittedClass = "form-control"
            }

            return (
                <label key={`label${element}`} className={props.submitted ? submittedClass : selectedClass}>
                    <input
                        disabled={props.submitted}
                        key={element}
                        type="radio"
                        id={element}
                        name={props.question}
                        value={element}
                        checked={answer === element}
                        onChange={handleChange}
                    />
                    {he.decode(element)}
                </label>
            )}
    )
    const decodedQuestion = he.decode(props.question)

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

// BACKUP HERE -------------

// const [answerData, setAnswerData] = useState({
//     [props.question]: ""                            // question: answer (malo čudno, znam; to je ono selectano)
// })
// const [answersArray, setAnswersArray] = useState(() => initializeArray())
// const {[props.question]: answer} = answerData

// function initializeArray() {
//     const answersArray = props.incorrect_answers
//     answersArray.push(props.correct_answer)
//     return answersArray.sort()
// }

// function handleChange(event) {
//     const {value, name} = event.target
//     setAnswerData(prevAnswers => {
//         return {
//             ...prevAnswers,
//             [name]: value
//         }
//     })
// }

// let isCorrect = false

// useEffect(() => {
//     isCorrect && props.setPoints(prevState => prevState + 1)
// }, [props.submitted])

// const showAnswers = answersArray.map (
//     element => {
//         const selectedClass = answer === element ? "form-control-selected" : "form-control"
//         const correctClass = "form-control-correct"
//         const incorrectClass = "form-control-incorrect"
//         let submittedClass = ""

//         if (props.correct_answer === element) {
//             submittedClass = correctClass
//             if(answer === element) {
//                 isCorrect = true
//             }
//         } else if (answer === element && props.correct_answer !== element) {
//             submittedClass = incorrectClass
//         } else {
//             submittedClass = "form-control"
//         }

//         return (
//             <label key={`label${element}`} className={props.submitted ? submittedClass : selectedClass}>
//                 <input
//                     disabled={props.submitted}
//                     key={element}
//                     type="radio"
//                     id={element}
//                     name={props.question}
//                     value={element}
//                     checked={answer === element}
//                     onChange={handleChange}
//                 />
//                 {he.decode(element)}
//             </label>
//         )}
// )
// const decodedQuestion = he.decode(props.question)

// return (
//     <section>
//         <h2 className="question">{decodedQuestion}</h2>
//         <div className="answers-row">
//             {showAnswers}
//         </div>
//         <hr className="line"/>
//     </section>
// )