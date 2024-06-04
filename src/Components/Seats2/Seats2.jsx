import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Seats2.css';
import './styles2.css';

const Seats = () => {
  const [secilen_koltuklar, setsecilen_koltuklar] = useState([]);

  const handleSeatClick = (seatIndex) => {
    setsecilen_koltuklar(prevsecilen_koltuklar => {
      if (prevsecilen_koltuklar.includes(seatIndex)) {
        return prevsecilen_koltuklar.filter(seat => seat !== seatIndex);
      } else {
        return [...prevsecilen_koltuklar, seatIndex];
      }
    });
  };

  const handleRowClick = (rowIndex) => {
    setsecilen_koltuklar(prevsecilen_koltuklar => {
      const rowSeats = Array.from({ length: 8 }, (_, i) => i + rowIndex * 8);  // Calculates the seats for the entire row
      const newsecilen_koltuklar = prevsecilen_koltuklar.some(seat => rowSeats.includes(seat))
        ? prevsecilen_koltuklar.filter(seat => !rowSeats.includes(seat))  // Deselects the row if any seat is already selected
        : [...prevsecilen_koltuklar, ...rowSeats];  // Selects all seats in the row if none are selected
      return newsecilen_koltuklar.sort((a, b) => a - b);  // Sorts the array to maintain order
    });
  };
  const handleSubmit = async () => {
    const biletAlData = {

      // secilen_koltuklar
      // secilenKoltukSayisi: secilen_koltuklar.length,
      secilenKoltuklar: secilen_koltuklar.join(', ')
      
    };

    try {
      const response = await fetch('http://localhost:8080/api/seats/save', {
        method: 'PUT',
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
      console.log(biletAlData);
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while saving the seats!');
    }
  };

  return (
    <div className="App">
      <div className="nav-buttons">
                <Link to="/2" className="nav-button">HOME</Link>
                <Link to="/about-us2" className="nav-button">ABOUT US</Link>
                <Link to="/our-team2" className="nav-button">OUR TEAM</Link>
                <Link to="/my-profile" className="nav-button">MY PROFILE</Link>
      </div>
      <div className="seat-area">
        <div className="Movies">
          <select>
            {/* Options here */}
          </select>
        </div>
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
                className={`seat ${secilen_koltuklar.includes(seatIndex) ? 'selected' : ''}`}
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
          <p className="count">{secilen_koltuklar.length} Seats Selected</p>
        </div>
      </div>
      
        <button className="nav-button" onClick={handleSubmit}> Go To Payment </button>
      </div>
    
  );
};

export default Seats;
