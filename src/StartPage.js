import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
        <div className="main-page vertical-center">
            <h1 className="title">quiZoMania</h1>
            <h3 className="subtitle">Quiz app by Zoran and Marin</h3>
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
            </div>
            <button className="styled-button longer-button" onClick={() => props.setStartPageActive(false)}>Start the damn quiz!</button>
        </div>
    )
}