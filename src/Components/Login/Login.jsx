import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

import email_icon from '../Assets/mail.png';
import password_icon from '../Assets/padlock.png';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate hook'unu tanımlayın

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const user = await response.json();
                console.log("Login successful: ", user);
                if (user.email.endsWith("@khascinema.com")) {
                    navigate('/saloon-operation'); // Admin kullanıcıları için yönlendirme
                } else {
                    navigate('/2'); // Normal kullanıcılar için yönlendirme
                }
            } else if (response.status === 401) {
                setError('Incorrect email or password');
            } else {
                setError('An error occurred. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleSignup = () => {
        console.log("Redirect to signup page");
        navigate('/signup'); // Signup sayfasına yönlendirme
    };

    return (
        <div className='container0'>
            <Link to="/">
                <button className="back-button0">&lt;</button>
            </Link>
            <div className="header0">
                <div className="text0">Login</div>
            </div>
            <form onSubmit={handleLogin} className="inputs0">
                <div className="input0">
                    <img src={email_icon} alt="Email" />
                    <input
                        type="email"
                        placeholder='Email Id'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input0">
                    <img src={password_icon} alt="Password" />
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <div className="forgot-password0">Lost Password?<span> Click Here!</span></div>
                <div className="submit-container0">
                    <div className="submit0" onClick={handleSignup}>Sign Up</div>
                    <button type="submit" className="submit0">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
