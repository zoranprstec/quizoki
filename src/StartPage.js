import { useState } from "react"

export default function StartPage(props) {
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
            <h1 className="title">QuiZoki</h1>
            <h3 className="subtitle">Ya, dis here is all me, brace yerselfs</h3>
            <select
                value={props.quizData.category}
                name="category"
                onChange={handleDropdown}
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
            >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <br />
            <br />
            <button className="start-quiz-button" onClick={() => props.setStartPage(prevPage => !prevPage)}>Start the damn quiz!</button>
        </div>
    )
}