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

    function handleButton(event) {
        const {id} = event.target
        navigate(`/${id}`, { replace: false })
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
                    <option value="0">Movies</option>
                    <option value="1">TV Shows</option>
                    <option value="2">Books</option>
                    <option value="3">History</option>
                    <option value="4">Science</option>
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
            <button className="styled-button longer-button" id="addquestion" onClick={handleButton}>Add question</button>
        </div>
    )
}