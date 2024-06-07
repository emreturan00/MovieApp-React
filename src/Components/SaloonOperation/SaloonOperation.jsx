import React, { useState, useEffect } from 'react';
import './SaloonOperation.css';
import { Link } from 'react-router-dom';




function App() {
  const [salons, setSalons] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8080/api/cinemas')
      .then(response => response.json())
      .then(data => setSalons(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

    

  const [newSalon, setNewSalon] = useState({
  name: '',
  capacity: '',
  price: '',
});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSalon({ ...newSalon, [name]: value });
  };





  const handleDateInputChange = (id, e) => {
    const { value } = e.target;
    setSalons(salons.map(salon => salon.id === id ? { ...salon, date: value } : salon));
  };

  const handleTimeInputChange = (id, e) => {
    const { value } = e.target;
    setSalons(salons.map(salon => salon.id === id ? { ...salon, time: value } : salon));
  };

  const handleAddFilm = (cinemaId, filmName) => {
  
  fetch(`http://localhost:8080/api/cinemas/${cinemaId}/movies/${filmName}`, {
    method: 'POST',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // If you want to do something after a successful add, like re-fetching the salons
    // fetchSalons();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

  const handleAddSalon = () => {
    if (!newSalon.name || !newSalon.capacity) return;
    setNewSalon({ name: '', capacity: ''});
  
    // Post the new salon to the database
    fetch('http://localhost:8080/api/cinemas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSalon),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  
  const handleDeleteSalon = (id) => {
    fetch(`http://localhost:8080/api/cinemas/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // If you want to do something after a successful delete, like re-fetching the salons
      // fetchSalons();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };



  return (
    <div className="transparent-container33">
    <div className="nav-buttons">
     <Link to="/Admin" className="nav-button-management">DASHBOARD</Link>
      <Link to="/FilmForm" className="nav-button-management">FILM ADD/DELETE</Link>
      <Link to="/saloon-operation" className="nav-button-management">SEANS/SALOON EDITION</Link>
      <Link to="/UserManagement" className="nav-button-management">USER MANAGEMENT</Link>
      <Link to="/" className="nav-button-management">LOG OUT</Link>
    </div>

    
    <div className="App33">
      <h1>SALOON OPERATION</h1>
      <div className="salon-form33">
  <input
    type="text"
    name="name"
    placeholder="Saloon name"
    value={newSalon.name}
    onChange={handleInputChange}
  />
  <input
    type="number"
    name="capacity"
    placeholder="Capacity"
    value={newSalon.capacity}
    onChange={handleInputChange}
  />
  <input
    type="number"
    name="price"
    placeholder="Price"
    value={newSalon.price}
    onChange={handleInputChange}
  />
  <button onClick={handleAddSalon}>Add saloon</button>
</div>
      <div className="salon-list">
        {salons.map(salon => (
          <div key={salon.id} className="salon-container">
            <div className="salon-item">
              <h2>{salon.name}</h2>
              <p>Capacity: {salon.capacity}</p>
              <p>Seat arrangement: {salon.layout}</p>
              <div>
      
                <button onClick={() => handleAddFilm(salon.id, salon.film)}>Add film</button>
                <input
                  type="text"
                  placeholder="Film Name"
                  value={salon.film}
                  onChange={(e) => setSalons(salons.map(s => s.id === salon.id ? {...s, film: e.target.value} : s))}
                />
              <input
                type="date"
                value={salon.date}
                onChange={(e) => handleDateInputChange(salon.id, e)}
              />
              <input
                type="time"
                value={salon.time}
                onChange={(e) => handleTimeInputChange(salon.id, e)}
              />
              <button onClick={() => handleDeleteSalon(salon.id)}>Delete Saloon</button>
              <div className="films33">
               <h3>Films</h3>
            <div className="scrollable-content">
              <p>Movie 1      -       xx/yy/zz -  00:00</p>
              <p>Movie 2      -       xx/yy/zz -  00:00</p>
              <p>Movie 3      -       xx/yy/zz -  00:00</p>
            </div>
          </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
