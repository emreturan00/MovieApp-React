import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './Seats2.css';
import './styles2.css';

const Seats = ({ ogrenciBiletSayisi, tamBiletSayisi }) => {
  const location = useLocation();
  const totalPrice = location.state.totalPrice;
  const cevap = location.state.cevap;

  const occupiedSeats = String(cevap)
    .split(',')
    .map(Number)
    .filter(Boolean);

  const navigate = useNavigate();
  const [secilen_koltuklar, setsecilen_koltuklar] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSeatClick = (seatIndex) => {
    if (occupiedSeats.includes(seatIndex)) {
      return; // Don't do anything if the seat is occupied
    }

    setsecilen_koltuklar((prevsecilen_koltuklar) => {
      if (prevsecilen_koltuklar.includes(seatIndex)) {
        return prevsecilen_koltuklar.filter((seat) => seat !== seatIndex);
      } else {
        if (prevsecilen_koltuklar.length < ogrenciBiletSayisi + tamBiletSayisi) {
          return [...prevsecilen_koltuklar, seatIndex];
        } else {
          setErrorMessage('Cannot select more seats');
          setTimeout(() => setErrorMessage(null), 2000);
          return prevsecilen_koltuklar;
        }
      }
    });
  };

  const handleRowClick = (rowIndex) => {
    setsecilen_koltuklar((prevsecilen_koltuklar) => {
      const rowSeats = Array.from({ length: 8 }, (_, i) => i + rowIndex * 8);
      const newsecilen_koltuklar = prevsecilen_koltuklar.some((seat) => rowSeats.includes(seat))
        ? prevsecilen_koltuklar.filter((seat) => !rowSeats.includes(seat))
        : [...prevsecilen_koltuklar, ...rowSeats];

      if (newsecilen_koltuklar.length > ogrenciBiletSayisi + tamBiletSayisi) {
        setErrorMessage('Cannot select more seats');
        setTimeout(() => setErrorMessage(null), 2000);
        return prevsecilen_koltuklar;
      } else {
        return newsecilen_koltuklar.sort((a, b) => a - b);
      }
    });
  };

  const handleSubmit = async () => {
    if (secilen_koltuklar.length !== ogrenciBiletSayisi + tamBiletSayisi) {
      setErrorMessage('Selected seats do not match the total of ticket number');
      setTimeout(() => setErrorMessage(null), 2000);
      return;
    }

    const biletAlData = {
      secilenKoltuklar: secilen_koltuklar.join(', '),
    };

    try {
      const response = await fetch('http://localhost:8080/api/biletal/save', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(biletAlData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('MySQL response:', responseData);
        alert('Seats successfully saved!');
        navigate('/payment2', { state: { totalPrice } });
      } else {
        const errorData = await response.json();
        console.error('Error saving seats:', errorData);
        alert('Error saving seats!');
      }
      console.log(biletAlData);
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while saving the seats!');
    }
  };

  return (
    <div className="App">
      {errorMessage && (
        <div
          style={{
            color: 'red',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          {errorMessage}
        </div>
      )}

      <div className="nav-buttons">
        <Link to="/2" className="nav-button">HOME</Link>
        <Link to="/about-us2" className="nav-button">ABOUT US</Link>
        <Link to="/our-team2" className="nav-button">OUR TEAM</Link>
        <Link to="/my-profile" className="nav-button">MY PROFILE</Link>
      </div>
      <div className="seat-area">
        <ul className="ShowCase">
          <li>{secilen_koltuklar.length > 0 ? secilen_koltuklar.join(', ') : 'N/A'}</li>
          <li>Selected</li>
          <li>Occupied</li>
        </ul>
        <div className="Cinema">
          <div className="screen"></div>
          <div className="seats">
            {[...Array(64)].map((_, seatIndex) => (
              <div
                className={`
                  seat 
                  ${secilen_koltuklar.includes(seatIndex) ? 'selected' : ''}
                  ${occupiedSeats.includes(seatIndex) ? 'occupied' : ''}
                `}
                key={seatIndex}
                onClick={() => {
                  if (!occupiedSeats.includes(seatIndex)) {
                    handleSeatClick(seatIndex);
                  }
                }}
              ></div>
            ))}
          </div>
          <div className="row-buttons">
            {[...Array(8)].map((_, rowIndex) => (
              <button className="row-button" key={rowIndex} onClick={() => handleRowClick(rowIndex)}>
                Select Row {rowIndex + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="info">
          <p className="count">{secilen_koltuklar.length} Seats Selected</p>
        </div>
      </div>
      
      <button className="blue-btn" onClick={handleSubmit}>Go to Payment</button>
    </div>
  );
};

export default Seats;
