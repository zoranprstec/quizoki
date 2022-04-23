import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function StartPage(props) {
    const navigate = useNavigate()

    function handleDropdown(event) {
        const {value, name} = event.target
        props.setQuizData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    return (
        <div className="main-page">
            <h1 className="title">quiZoMania</h1>
            <h3 className="subtitle">Ya, dis here is all us, brace yerselfs</h3>
            <div className="dropdown-container">
                <select
                    value={props.quizData.category}
                    name="category"
                    onChange={handleDropdown}
                    className="dropdown"
                >
                    <option value="">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainemnt: Books</option>
                    <option value="11">Entertainemnt: Film</option>
                    <option value="14">Entertainemnt: Television</option>
                    <option value="15">Entertainemnt: Video Games</option>
                    <option value="16">Entertainemnt: Board Games</option>
                    <option value="17">Science and Nature</option>
                </select>
                <select
                    value={props.quizData.difficulty}
                    name="difficulty"
                    onChange={handleDropdown}
                    className="dropdown"
                >
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <button className="styled-button longer-button" onClick={() => props.setStartPageActive(false)}>Start the damn quiz!</button>
        </div>
    )
}