import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

import user_icon from '../Assets/user.png';
import email_icon from '../Assets/mail.png';
import password_icon from '../Assets/padlock.png';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Importing the check icon


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showTick, setShowTick] = useState(false);
    const [showCross, setShowCross] = useState(false); // New state variable for the cross sign
    const [emailError, setEmailError] = useState(""); // New state variable for the email error message
    const [passwordError, setPasswordError] = useState("");

    const handleSignup = async (event) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            setShowCross(true);
        }

        if (!passwordRegex.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter, one number, and be at least 6 characters long");
            setShowCross(true);
        }

        if (!name || !email || !password || !emailRegex.test(email) || !passwordRegex.test(password)) {
            console.log('One or more fields are empty');
            setShowCross(true);

            // Hide the cross sign after 1 second
            setTimeout(() => {
                setShowCross(false);
            }, 2000);
            return; // Exit the function
        }
        
        const formData = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                // Handle successful signup (e.g., show a success message, redirect to another page)

                // Show the tick icon
                setShowTick(true);

                // Clear the input boxes
                setName("");
                setEmail("");
                setPassword("");

                // Hide the tick icon after 1 second
                setTimeout(() => {
                    setShowTick(false);
                }, 2000);
            } else {
                console.error('Signup failed');
                // Handle signup failure (e.g., show an error message)
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const handleLoginRedirect = () => {
        // Implement login page navigation logic here, e.g., using react-router
        console.log("Redirect to login page");
    };

    return (
        <div className='container1'>
            {showTick && <FaCheckCircle style={{ color: 'green', position: 'absolute', top: '70%', left: '48%', zIndex: 1000, fontSize: '50px' }} />}
            {showCross && <FaTimesCircle style={{ color: 'red', position: 'absolute', top: '70%', left: '48%', zIndex: 1000, fontSize: '50px' }} />}
            <Link to="/">
            <button className="back-button1">&lt;</button>
            </Link>
            <div className="header1">
                <div className="text1">Sign Up</div>
            </div>
            <div className="inputs1">
                <div className="input1">
                    <img src={user_icon} alt="User" />
                    <input
                        type="text"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input1">
                    <img src={email_icon} alt="Email" />
                    <input
                        type="email"
                        placeholder='Email Id'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p style={{ color: 'red', fontSize:'12px' }}>{emailError}</p>}

                </div>
                <div className="input1">
                    <img src={password_icon} alt="Password" />
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p style={{ color: 'red', fontSize:'12px' }}>{passwordError}</p>}
                </div>
            </div>
            <div className="submit-container">
                <Link to="/login">
                <div className="submit" onClick={handleSignup}>Sign Up</div>
                </Link>
                <Link to="/login">
                <div className="submit gray" onClick={handleLoginRedirect}>Login</div>
                </Link>
            </div>
        </div>
    );
};

export default Signup;