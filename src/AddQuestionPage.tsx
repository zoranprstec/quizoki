import * as React from "react"
import { useEffect, useState } from "react"
import { useStopwatch } from "react-timer-hook"
import Button from "@kiwicom/orbit-components/lib/Button"

export default function AddQuestionPage() {
    const [isLoaded, setIsLoaded] = useState(true)
    // const [error, setError] = useState(null)
    const [loadedSuccessfully, setLoadedSuccessfully] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        wrongAnswer1: "",
        wrongAnswer2: "",
        wrongAnswer3: "",
        wrongAnswer4: "",
        correctAnswer: "",
        category: 0
    })
    const {
        seconds,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: false })

    if (seconds >= 4) {
        reset(undefined, false)
    }
 
    function handleUpdate(event: { target: { name: string; value: string | number } }) {
        const {name, value} = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleSubmit(event: { preventDefault: () => void }) {
        const request = {
            method: "POST",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                title: formData.title,
                answerOne: formData.wrongAnswer1,
                answerTwo: formData.wrongAnswer2,
                answerThree: formData.wrongAnswer3,
                answerFour: formData.wrongAnswer4,
                answer: formData.correctAnswer,
                category: formData.category
            })
        }

        setIsLoaded(false)

        fetch("https://localhost:44396/api/Question/AddQuestion", request)
            .then(response => {
                if (!response.ok) {
                    throw Error("Server responded with 'not ok bro' code")
                }
            })
            .then(() => {
                setIsLoaded(true)
                setLoadedSuccessfully(true)
            },
            error => {
                setIsLoaded(true)
                // setError(error)
                setLoadedSuccessfully(false)
                alert(error)
            })

        event.preventDefault()
    }
    
    useEffect(() => {
        if(loadedSuccessfully) {
            console.log("Sent succesfully")
            setLoadedSuccessfully(false)
            reset()
            isRunning ? pause() : start()
        }
    }, [loadedSuccessfully])

    return (
        <div>
            <form onSubmit={handleSubmit} className="vertical-center">
                <select
                    title="Add Question"
                    value={+formData.category}
                    name="category"
                    onChange={handleUpdate}
                    className="dropdown standard-width"
                    required
                >
                    <option value={undefined}>-- Choose Category --</option>
                    <option value={0}>Movies</option>
                    <option value={1}>TV Shows</option>
                    <option value={2}>Books</option>
                    <option value={3}>History</option>
                    <option value={4}>Science</option>
                </select>
                <br></br>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    name="title"
                    onChange={handleUpdate}
                    className="form-input"
                    required
                ></input>
                <br></br>
                <input
                    type="text"
                    placeholder="Wrong answer 1"
                    value={formData.wrongAnswer1}
                    name="wrongAnswer1"
                    onChange={handleUpdate}
                    className="form-input"
                    required
                ></input>
                <br></br>
                <input
                    type="text"
                    placeholder="Wrong answer 2"
                    value={formData.wrongAnswer2}
                    name="wrongAnswer2"
                    onChange={handleUpdate}
                    className="form-input"
                    required
                ></input>
                <br></br>
                <input
                    type="text"
                    placeholder="Wrong answer 3"
                    value={formData.wrongAnswer3}
                    name="wrongAnswer3"
                    onChange={handleUpdate}
                    className="form-input"
                    required
                ></input>
                <br></br>
                <input
                    type="text"
                    placeholder="Wrong answer 4"
                    value={formData.wrongAnswer4}
                    name="wrongAnswer4"
                    onChange={handleUpdate}
                    className="form-input"
                    required
                ></input>
                <br></br>
                <input
                    type="text"
                    placeholder="Correct answer"
                    value={formData.correctAnswer}
                    name="correctAnswer"
                    onChange={handleUpdate}
                    className="form-input"
                    required
                ></input>
                <br></br>
                <div className="flex-row-to-col">
                        <Button submit={true} circled={true}>Send question</Button>
                    </div>
                {isRunning && <div className="timer-popup">Question succesfully sent</div>}
            </form>
            {!isLoaded && <div>Loading...</div>}
        </div>
    )
}

    // function showPopup() {
    //     reset()
    //     isRunning ? pause() : start()
    // }