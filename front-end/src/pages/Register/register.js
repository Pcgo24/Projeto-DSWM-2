import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './register.css';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            /*Padrão de Projeto: Façade
            A função handleSubmit usa a biblioteca axios para enviar uma requisição HTTP. 
            Isso simplifica o uso da comunicação com o servidor. O axios faz a operação HTTP sem a necessidade de interagir diretamente
            com as complexidades da API ou outras dependências.*/
            const response = await axios.post("http://localhost:8000/usuario/registro", { name, email, password });


            setMessage(response.data.message);
            setError("");
        } catch (err) {
            console.error('ESSE FOI O ERRO:', err);
            setError(err.response?.data?.message || "Erro ao registrar usuário");
            setMessage("");
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h1>Cadastro</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

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

                    <button type="submit">Cadastrar</button>
                    <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
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

export default Register;
