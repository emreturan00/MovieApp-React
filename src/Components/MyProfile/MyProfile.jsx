import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyProfile.css';

import profileIcon from '../Assets/user2.png'
import img1 from '../Assets/img5.png'
import img2 from '../Assets/img8.jpg'
import img3 from '../Assets/img7.jpg'
import img4 from '../Assets/img6.webp'

const MyProfile = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    // Kullanıcı bilgilerini API'den çek
    fetch('http://localhost:8080/api/users') // Bu endpoint'i backendde oluşturmalısınız
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          email: data.email
        });
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handleRemoveItem = (itemToRemove) => {
    setSelectedItems(selectedItems.filter(item => item !== itemToRemove));
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        console.log('User deleted successfully');
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        console.log('User logged out successfully');
        window.location.href = "/"; // Redirect to "/"

      } else {
        console.error('Failed to log out user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="transparent-container77">
      <div className="nav-buttons">
        <Link to="/2" className="nav-button">HOME</Link>
        <Link to="/about-us2" className="nav-button">ABOUT US</Link>
        <Link to="/our-team2" className="nav-button">OUR TEAM</Link>
        <Link to="/my-profile" className="nav-button">MY PROFILE</Link>
      </div>

      <div className="container77">
        <div className="menu-button1" onClick={toggleMenu}>
          <span>...</span> {/* Menü ikonu olarak "☰" kullanabilirsiniz */}
        </div>
        <div className={`menu1 ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <button 
                onClick={handleLogout} 
                style={{
                  background: 'none',
                  color: 'inherit',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                  cursor: 'pointer',
                  outline: 'inherit'
                }}
              >
                Log Out
              </button>
            </li>
            <li>
              <button 
                onClick={handleDeleteUser} 
                style={{
                  background: 'none',
                  color: 'inherit',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                  cursor: 'pointer',
                  outline: 'inherit'
                }}
              >
                Delete Account
              </button>
            </li>
          </ul>
        </div>

        <h1>User Card</h1>
        <div className="name">
          Name:<span> {user.name} </span>
        </div>
        <div className="email">
          Email: <span> {user.email} </span>
        </div>
        <img src={profileIcon} alt="User Icon" className="profile-icon" />
      </div>
      
      <div className="myprofile">
        <p> My Profile </p>
      </div>

      <div className="mytickets">
        <h1>My Tickets</h1>
        <div className="scrollable-content">
          <p>Movie 1 - xx/yy/zz - 00:00</p>
          <p>Movie 2 - xx/yy/zz - 00:00</p>
          <p>Movie 3 - xx/yy/zz - 00:00</p>
          <p>Movie 4 - xx/yy/zz - 00:00</p>
          <p>Movie 5 - xx/yy/zz - 00:00</p>
          <p>Movie 6 - xx/yy/zz - 00:00</p>
        </div>
      </div>

      <div className="yourfavourites">
        <p> My Favorites </p>
      </div>
      <div className="wrap">
        <div className="card">
          <img className="background" src={img1} alt="" />
          <div className="card-content">
            <h3 className="title">MOVIE 1</h3>
          </div>
          <div className="backdrop"></div>
        </div>

        <div className="card">
          <img className="background" src={img2} alt="" />
          <div className="card-content">
            <h3 className="title">MOVIE 2</h3>
          </div>
          <div className="backdrop"></div>
        </div>

        <div className="card">
          <img className="background" src={img3} alt="" />
          <div className="card-content">
            <h3 className="title">MOVIE 3</h3>
          </div>
          <div className="backdrop"></div>
        </div>

        <div className="card">
          <img className="background" src={img4} alt="" />
          <div className="card-content">
            <h3 className="title">MOVIE 4</h3>
          </div>
          <div className="backdrop"></div>
        </div>
      </div>

      <div className="selected-items">
        <ul>
          {selectedItems.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleRemoveItem(item)}>x</button>
            </li>
          ))}
        </ul>
      </div>
      <footer className="site-footer">
        <div className="row">
          <div className="col-xs-6 col-md-3 text-center">
            <h6 className="footer-title">CURRENTLY SHOWING</h6>
            <ul className="footer-links">
              <li><button>CS1</button></li>
              <li><button>CS2</button></li>
              <li><button>CS3</button></li>
              <li><button>CS4</button></li>
              <li><button>CS5</button></li>
              <li><button>CS6</button></li>
            </ul>
          </div>
          <div className="col-xs-6 col-md-3 text-center">
            <h6 className="footer-title">COMING SOON</h6>
            <ul className="footer-links">
              <li><button>Home</button></li>
              <li><button>Contact Us</button></li>
              <li><button>About Us</button></li>
              <li><button>My Profile</button></li>
              <li><button>Log in</button></li>
            </ul>
          </div>
        </div>
        <hr />
      </footer>
    </div>
  );
};

export default MyProfile;
