import React, { useState } from 'react';
import './Payment.css'; // Ensure the CSS is correctly imported
import { Link } from 'react-router-dom';

async function postPaymentData(paymentData) {
    const response = await fetch('http://localhost:8080/api/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

function Payment() {
    const [paymentData, setPaymentData] = useState({
        amount: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        billingAddress: '',
        paymentMethod: 'creditCard'
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        let tempErrors = {};
        const { amount, cardNumber, expiry, cvv, billingAddress } = paymentData;
        if (!amount) tempErrors.amount = 'Amount is required';
        if (!cardNumber) tempErrors.cardNumber = 'Card number is required';
        if (!expiry) tempErrors.expiry = 'Expiration date is required';
        if (!cvv) tempErrors.cvv = 'CVV is required';
        if (!billingAddress) tempErrors.billingAddress = 'Billing address is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                console.log('Submitting payment data:', paymentData);
                const response = await postPaymentData(paymentData);
                console.log('API Response:', response);
                setIsSubmitted(true); // Simulating a successful submission
            } catch (error) {
                console.error("There was an error submitting the payment!", error);
            }
        }
    };

    const handleChange = (event) => {
        setPaymentData({ ...paymentData, [event.target.name]: event.target.value });
    };

    if (isSubmitted) {
        return (
            <div className="confirmation55">
                <h2>Thank you for your payment!</h2>
                <p>Your transaction has been processed.</p>
            </div>
        );
    }

    return (
        <div className="payment-container55">
            <div className="nav-buttons5">
                <Link to="/" className="nav-button">HOME</Link>
                <Link to="/about-us" className="nav-button">ABOUT US</Link>
                <Link to="/our-team" className="nav-button">OUR TEAM</Link>
                <Link to="/login" className="nav-button">LOGIN/SIGNUP</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <h1>Payment Details</h1>
                {Object.keys(errors).length > 0 && (
                    <div className="errors">
                        {Object.values(errors).map(error => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                )}
                <div className="input-group55">
                    <label>Payment Amount:</label>
                    <input name="amount" type="text" value={paymentData.amount} onChange={handleChange} />
                </div>
                <div className="input-group55">
                    <label>Payment Method:</label>
                    <select name="paymentMethod" value={paymentData.paymentMethod} onChange={handleChange}>
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="applePay">Apple Pay</option>
                    </select>
                </div>
                <div className="input-group55">
                    <label>Card Number:</label>
                    <input name="cardNumber" type="text" value={paymentData.cardNumber} onChange={handleChange} />
                </div>
                <div className="input-group55">
                    <label>Expiration Date (MM/YY):</label>
                    <input name="expiry" type="text" value={paymentData.expiry} onChange={handleChange} />
                </div>
                <div className="input-group55">
                    <label>CVV:</label>
                    <input name="cvv" type="text" value={paymentData.cvv} onChange={handleChange} />
                </div>
                <div className="input-group55">
                    <label>Billing Address:</label>
                    <input name="billingAddress" type="text" value={paymentData.billingAddress} onChange={handleChange} />
                </div>
                
                <button className="button55" type="submit">Submit Payment</button>
                
            </form>
        </div>
    );
}

export default Payment;
