import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase-config'; 
import './login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get("http://localhost:8000/usuario/check-session", {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    navigate('/feedback');
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkSession();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth(app); 
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const idToken = await user.getIdToken();

            const response = await axios.post("http://localhost:8000/usuario/login", { token: idToken }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setMessage(response.data.message);
            setError("");

            navigate('/feedback');
        } catch (err) {
            console.error('ESSE FOI O ERRO: ', err);
            setError(err.response?.data?.message || "Erro ao fazer login");
            setMessage("");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
    
                    <div>
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
    
                    <button type="submit">Entrar</button>
                    
                    <p>Não tem conta?<Link to="/register">Cadastre-se</Link></p>
                </form>
    
                {message && (
                    <p className="success-message">{message}</p>
                )}
                {error && (
                    <p className="error-message">{error}</p>
                )}
            </div>
        </div>
    );
    
};

export default Login;
