import * as React from "react";

interface StartPageProps {
    setQuizData: (arg0: (prevData: any) => any) => void
    quizData: { category: string | number | readonly string[] | undefined }
    startPageActive: boolean
    setStartPageActive: (arg0: boolean) => void
}

export default function StartPage({setQuizData, quizData, setStartPageActive}: StartPageProps) {
    function handleDropdown(event: { target: { value: any; name: any } }) {
        const {value, name} = event.target
        setQuizData((prevData: any) => {
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
            <button className="styled-button longer-button" onClick={() => setStartPageActive(false)}>Start the damn quiz!</button>
        </div>
    )
}