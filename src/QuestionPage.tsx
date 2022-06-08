import * as React from "react"
import QuestionCard from "./QuestionCard"
import { useState, useEffect } from "react"
import Button from "@kiwicom/orbit-components/lib/Button"
import { quizDataTypes } from "./App"

interface QuestionPageProps {
    quizData: quizDataTypes
    setStartPage: (arg0: (prevPage: boolean) => boolean ) => void 
}

interface localDataTypes {
    category: number
    answer: string
    answerOne: string
    answerTwo: string
    answerThree: string
    answerFour: string
    title: string
}

export default function QuestionPage({ quizData, setStartPage }: QuestionPageProps) {
    const [localData, setLocalData] = useState<localDataTypes[]>([{
        category: 0,
        answer: "",
        answerOne: "",
        answerTwo: "",
        answerThree: "",
        answerFour: "",
        title: ""
    }])
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [points, setPoints] = useState<number>(0)
    const [update, setUpdate] = useState<number>(0)
    const [error, setError] = useState<any>(null)
    const request = {
        method: "GET",
        headers: { Accept: "application/json", "Content-Type": "application/json" }
    }
    
    useEffect(() => {
        for (let i = 0; i < 5; i++) {
            fetch(`https://localhost:44396/api/Question/RandomQuestion?category=${quizData.category}`, request)
                .then(response => response.json())
                .then(dataReceived => {
                    console.log(dataReceived)
                    setLocalData(prevData => {
                        if (prevData[0].answer === "") {
                            return [dataReceived]
                        }
                        const arr = prevData
                        arr.push(dataReceived)
                        return arr
                    })
                    // setLoadedSuccessfully(true)
                    setUpdate(prevState => prevState + 1)
                },
                error => {
                    console.log(typeof error)
                    setError(error)
                    // setLoadedSuccessfully(false)
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
            setStartPage(prevPage => !prevPage)
        }
    }

    if (error) {
        return (
            <div>
                Error: {error["message"]}
                <br />
                <div className="flex-row-to-col">
                    <Button onClick={() => setStartPage(prevPage => !prevPage)} circled={true}>Back</Button>
                </div>
            </div>
        )
    } else if (!isLoaded) {
        return <h4 className="loading-text">Loading...</h4>
    } else {
        let i = 0
        const questionCards = localData.map(element => {
            i++
            return <QuestionCard 
                elements={element}
                key={element.title + i}
                submitted={submitted}
                setPoints={setPoints}
            />
    })

        return ( 
            <main className="vertical-align">
                {questionCards}
                {submitted && <h3 className="score-text">You scored {points}/{questionCards.length}</h3>}
                <div className="flex-row-to-col">
                    <Button onClick={() => handleSubmitButton()} circled={true}>{submitted ? "Play again" : "Submit answers"}</Button>
                </div>
                <br />
            </main>
        )
    }
}
