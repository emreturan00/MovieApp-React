import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Seats.css';
import './styles.css';

const Seats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatIndex) => {
    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatIndex)) {
        return prevSelectedSeats.filter(seat => seat !== seatIndex);
      } else {
        return [...prevSelectedSeats, seatIndex];
      }
    });
  };

  const handleRowClick = (rowIndex) => {
    setSelectedSeats(prevSelectedSeats => {
      const rowSeats = Array.from({ length: 8 }, (_, i) => i + rowIndex * 8);  // Calculates the seats for the entire row
      const newSelectedSeats = prevSelectedSeats.some(seat => rowSeats.includes(seat))
        ? prevSelectedSeats.filter(seat => !rowSeats.includes(seat))  // Deselects the row if any seat is already selected
        : [...prevSelectedSeats, ...rowSeats];  // Selects all seats in the row if none are selected
      return newSelectedSeats.sort((a, b) => a - b);  // Sorts the array to maintain order
    });
  };

  const handleSubmit = async () => {
    const biletAlData = {

      selectedSeats,
      secilenKoltukSayisi: selectedSeats.length,
      secilenKoltuklar: selectedSeats.join(', ')
    };

    try {
      const response = await fetch('http://localhost:8080/api/seats/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(biletAlData)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('MySQL response:', responseData);
        alert('Seats successfully saved!');
      } else {
        const errorData = await response.json();
        console.error('Error saving seats:', errorData);
        alert('Error saving seats!');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while saving the seats!');
    }
  };

  return (
    <div className="App">
      <div className="nav-buttons">
                <Link to="/" className="nav-button">HOME</Link>
                <Link to="/about-us" className="nav-button">ABOUT US</Link>
                <Link to="/our-team" className="nav-button">OUR TEAM</Link>
                <Link to="/login" className="nav-button">LOGIN/SIGNUP</Link>
      </div>
      <div className="seat-area">
        <div className="Movies">
          <select>
            {/* Options here */}
          </select>
        </div>
        <ul className="ShowCase">
          <li>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'N/A'}</li>
          <li>Selected</li>
          <li>Occupied</li>
        </ul>
        <div className="Cinema">
          <div className="screen"></div>
          <div className="seats">
            {[...Array(64)].map((_, seatIndex) => (
              <div
                className={`seat ${selectedSeats.includes(seatIndex) ? 'selected' : ''}`}
                key={seatIndex}
                onClick={() => handleSeatClick(seatIndex)}
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
          <p className="count">{selectedSeats.length} Seats Selected</p>
        </div>
        </div>
      
      <Link to="/payment" className="blue-btn" onClick={handleSubmit}>Go to Payment</Link>
      </div>
    
  );
};

export default Seats;
