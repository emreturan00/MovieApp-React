import React, { useState } from 'react';
import './UserManagement.css'; // Ensure this matches the CSS file name
import { Link } from 'react-router-dom';

const UserManager = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/users/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        // İşlem başarılı
        console.log('User updated successfully');
      } else {
        // İşlem başarısız
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/delete/${userData.email}`, {
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

  return (
    <div>
      <h2 className="user-management-management">USER MANAGEMENT</h2>
      <div className="nav-buttons-management">
        <Link to="/Admin" className="nav-button-management">DASHBOARD</Link>
        <Link to="/FilmForm" className="nav-button-management">FILM ADD/DELETE</Link>
        <Link to="/saloon-operation" className="nav-button-management">SEANS/SALOON EDITION</Link>
        <Link to="/UserManagement" className="nav-button-management">USER MANAGEMENT</Link>
        <Link to="/" className="nav-button-management">LOG OUT</Link>
      </div>

      {/* Main section */}
      <div className="main-section-management">
        {/* User Form Section */}
        <div className="movie-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">User Name:</label>
              <input 
                type="text" 
                id="username" 
                value={userData.username}
                onChange={handleInputChange}
                placeholder="Enter user name" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">User Email:</label>
              <input 
                type="email" 
                id="email" 
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Enter user email" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">User Password:</label>
              <input 
                type="password" 
                id="password" 
                value={userData.password}
                onChange={handleInputChange}
                placeholder="Enter user password" 
                required 
              />
            </div>
            <div className="button-group22">
              <button className="blue-btn22" type="submit">Update</button>
              <button className="red-btn22" type="button" onClick={handleDeleteUser}>Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
