import React, { useState, useEffect } from "react";
import axios from "axios";
import './feedback.css';

const Feedback = () => {
    const [feedbackText, setFeedbackText] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get("http://localhost:8000/usuario/feedback/all");
            setFeedbacks(response.data);
        } catch (err) {
            console.error("Erro ao buscar feedbacks:", err);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/usuario/feedback/create",
                { feedbackText },
                { headers: { "Content-Type": "application/json" } }
            );

            setMessage(response.data.message);
            setError("");
            setFeedbackText("");
            fetchFeedbacks();
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao enviar feedback");
            setMessage("");
        }
    };

    return (
        <div className="feedback-container">
            <h1>Deixe seu Feedback</h1>
            <form onSubmit={handleSubmit} className="feedback-form">
                <div>
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea
                        id="feedback"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enviar Feedback</button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <h2>Feedbacks anteriores</h2>
            <ul className="feedback-list">
                {feedbacks.map((fb) => (
                    <li key={fb.id}>
                        <p><strong>Data:</strong> {fb.createdAt}</p>
                        <p>{fb.feedbackText}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feedback;
