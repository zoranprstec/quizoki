import * as React from "react"
import Button from "@kiwicom/orbit-components/lib/Button"
import { quizDataTypes } from "./App"

interface StartPageProps {
    setQuizData: (arg0: (prevData: quizDataTypes) => quizDataTypes) => void
    quizData: quizDataTypes
    startPageActive: boolean
    setStartPageActive: (arg0: boolean) => void
}

export default function StartPage({setQuizData, quizData, setStartPageActive}: StartPageProps) {
    function handleDropdown(event: { target: { value: string; name: string } }) {
        const {value, name} = event.target
        setQuizData((prevData: quizDataTypes) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    return (
        <div className="main-page vertical-center">
            <h1 className="title">quiZoMania</h1>
            <h3 className="subtitle">Quiz app by Zoran and Marin</h3>
            <div className="dropdown-container">
                <select
                    title="Category Select"
                    value={quizData.category}
                    name="category"
                    onChange={handleDropdown}
                    className="dropdown"
                >
                    <option value="">Any Category</option>
                    <option value="0">Movies</option>
                    <option value="1">TV Shows</option>
                    <option value="2">Books</option>
                    <option value="3">History</option>
                    <option value="4">Science</option>
                </select>
            </div>
            <div className="flex-row-to-col">
                <Button onClick={() => setStartPageActive(false)} circled={true}>Start the damn quiz!</Button>
            </div>
        </div>
    )
}