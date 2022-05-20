import * as React from "react"
import QuestionCard from "./QuestionCard"
import { useState, useEffect } from "react"

interface QuestionPageProps {
    // quizData: {
    //     category: number
    // }
    quizData: { category: string | number | readonly string[] | undefined }
    setStartPage: (arg0: (prevPage: boolean) => boolean ) => void 
}

export default function QuestionPage({ quizData, setStartPage }: QuestionPageProps) {
    const [localData, setLocalData] = useState<any[]>([])
    const [loadedSuccessfully, setLoadedSuccessfully] = useState<boolean>(true)
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [points, setPoints] = useState<number>(0)
    const [update, setUpdate] = useState<number>(0)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        for (let i = 0; i < 5; i++) {
            const request = {
                method: "GET",
                headers: { Accept: "application/json", "Content-Type": "application/json" }
            }
            fetch(`https://localhost:44396/api/Question/RandomQuestion?category=${quizData.category}`, request)
            .then(response => response.json())
            .then(dataReceived => {
                setLocalData(data => {
                    const arr: string[] = data
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
            setStartPage(prevPage => !prevPage)
        }
    }

    if (error) {
        return (
            <div>
                Error: {error["message"]}
                <br />
                <button className="styled-button horizontal-align longer-button" onClick={() => setStartPage(prevPage => !prevPage)}>Back</button>
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
                <button className="styled-button horizontal-align longer-button" onClick={() => handleSubmitButton()}>{submitted ? "Play again" : "Submit answers"}</button>
                <br />
            </main>
        )
    }
}
