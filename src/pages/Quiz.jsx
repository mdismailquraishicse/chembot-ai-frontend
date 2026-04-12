import "./Quiz.css";
import { useState } from "react";
import axios from "axios";

const url_quiz = "http://localhost:8000/quiz";

function Quiz() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [options, setOptions] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [result, setResult] = useState("");
    const [answered, setAnswered] = useState(false);

    async function getQuiz() {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                url_quiz,
                { question: "quiz" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    timeout: 600000
                }
            );

            setQuestion(res.data.quiz);
            setAnswer(res.data.answer);
            setOptions(res.data.options);

            // reset states for new question
            setSelectedOption("");
            setResult("");
            setAnswered(false);

        } catch (error) {
            console.error(error);
            setQuestion("");
        }
    }

    function submitAnswer() {
        const token = localStorage.getItem("token");

        const isCorrect = selectedOption === answer;

        axios.get(
            `${url_quiz}/${isCorrect ? 1 : 0}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setResult(isCorrect ? "🎉 Correct!" : "❌ Incorrect!");
        setAnswered(true);
    }

    function nextQuestion() {
        getQuiz();
    }

    return (
        <div className="quiz-page">
            <div className="quiz-card">

                <h1>ChemBot Quiz</h1>

                <button className="primary-btn" onClick={getQuiz}>
                    Start Quiz
                </button>

                {question && (
                    <div className="question-box">

                        <h3>{question}</h3>

                        <div className="options">
                            {["a", "b", "c", "d"].map((key) => (
                                options?.[key] && (
                                    <label
                                        key={key}
                                        className={`option ${selectedOption === options[key] ? "selected" : ""}`}
                                    >
                                        <input
                                            type="radio"
                                            name="quiz"
                                            value={options[key]}
                                            checked={selectedOption === options[key]}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            disabled={answered}
                                        />
                                        <span>{key.toUpperCase()}: {options[key]}</span>
                                    </label>
                                )
                            ))}
                        </div>

                        {!answered ? (
                            <button className="primary-btn" onClick={submitAnswer}>
                                Submit Answer
                            </button>
                        ) : (
                            <button className="primary-btn" onClick={nextQuestion}>
                                Next Question ⏭️
                            </button>
                        )}

                        {result && <p className="result">{result}</p>}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Quiz;