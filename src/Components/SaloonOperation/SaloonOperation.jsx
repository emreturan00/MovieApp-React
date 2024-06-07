import React, { useState } from 'react';
import './SaloonOperation.css';
import { Link } from 'react-router-dom';

function App() {
  const [salons, setSalons] = useState([
    { id: 1, name: 'SN 1', capacity: 50, layout: 'Theater', film: '', date: '', time: '' },
    { id: 2, name: 'SN 2', capacity: 40, layout: 'Theater', film: '', date: '', time: '' },
    { id: 3, name: 'SN 3', capacity: 60, layout: 'Theater', film: '', date: '', time: '' }
  ]);

  const [newSalon, setNewSalon] = useState({
    name: '',
    capacity: '',
    layout: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSalon({ ...newSalon, [name]: value });
  };

  const handleAddSalon = () => {
    if (!newSalon.name || !newSalon.capacity || !newSalon.layout) return;
    setSalons([...salons, { ...newSalon, id: Date.now(), film: '', date: '', time: '' }]);
    setNewSalon({ name: '', capacity: '', layout: '' });
  };

  const handleDeleteSalon = (id) => {
    setSalons(salons.filter(salon => salon.id !== id));
  };


  const handleDateInputChange = (id, e) => {
    const { value } = e.target;
    setSalons(salons.map(salon => salon.id === id ? { ...salon, date: value } : salon));
  };

  const handleTimeInputChange = (id, e) => {
    const { value } = e.target;
    setSalons(salons.map(salon => salon.id === id ? { ...salon, time: value } : salon));
  };

  const handleAddFilm = (id, filmName) => {
    // Buraya film eklemek için gerekli işlemleri yapabilirsiniz
    console.log(`Film eklendi salon id: ${id}, film adı: ${filmName}`);
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
    type="text"
    name="layout"
    placeholder="Seat arrangement"
    value={newSalon.layout}
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
