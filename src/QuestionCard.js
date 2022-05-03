import he from "he"                         // library za dekodiranje &quot; i sličnih gluposti
import {useState, useEffect} from "react"

export default function QuestionCard(props) {
    const [answerData, setAnswerData] = useState({
        [props.question]: ""                            // question: answer (malo čudno, znam; to je ono selectano)
    })
    const [answersArray, setAnswersArray] = useState(() => initializeArray())
    // const [selectedAnswer, setSelectedAnswer] = useState("")
    // const {[props.question]: selectedAnswerToStorage} = answerData
    const {[props.question]: selectedAnswer} = answerData


    // local storage moram koristiti jer neko sranje kod njih ne štima. State se gubi nakon kaj se parent rendera
    
    // selectedAnswerToStorage && localStorage.setItem("selectedAnswer", selectedAnswerToStorage)
    
    
    // useEffect(() => {
    //     const {[props.question]: answerConst} = answerData
    //     setSelectedAnswer(answerConst)
    // }, [answerData])
    
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
            const selectedClass = selectedAnswer === element ? "form-control-selected" : "form-control"
            const correctClass = "form-control-correct"
            const incorrectClass = "form-control-incorrect"
            let submittedClass = ""

            if (props.correct_answer === element) {
                submittedClass = correctClass
                if(selectedAnswer === element) {
                    isCorrect = true
                }
            } else if (selectedAnswer === element && props.correct_answer !== element) {
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
                        name={props.question}
                        value={element}
                        checked={selectedAnswer === element}
                        onChange={handleChange}
                    />
                    {he.decode(element)}
                </label>
            )}
    )

    const decodedQuestion = he.decode(props.question)

    return (
        <section>
            <p>{props.update}</p>
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