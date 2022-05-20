import React from "react"
import he from "he"                         // library za dekodiranje &quot; i sličnih gluposti
import {useState, useEffect} from "react"

export interface QuestionCardProps {
    elements: {
        answerOne: string
        answerTwo: string
        answerThree: string
        answerFour: string
        answer: string
        title: string
    }
    setPoints: (arg0: (prevState: any) => any) => any
    submitted: boolean
}

export default function QuestionCard({ elements, setPoints, submitted }: QuestionCardProps) {
    const { answerOne, answerTwo, answerThree, answerFour, answer, title } = elements
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

    function handleChange(event: { target: { value: any; name: any } }) {
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
        isCorrect && setPoints((prevState: number) => prevState + 1)
    }, [submitted])
    
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
                <label key={Math.random()} className={submitted ? submittedClass : selectedClass}>
                    <input
                        disabled={submitted}
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