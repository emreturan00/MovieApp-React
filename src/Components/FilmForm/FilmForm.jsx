import React, { useState } from 'react';
import './FilmForm.css'; 
import { Link } from 'react-router-dom';

async function postMovieData(formData) {
  const response = await fetch('http://localhost:8080/api/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function putMovieData(name, partialUpdateData) {
  const response = await fetch(`http://localhost:8080/api/movies/${name}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(partialUpdateData)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function deleteMovieData(name) {
  const response = await fetch(`http://localhost:8080/api/movies/${name}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

const FilmForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    director: '',
    cast: '',
    genre: '',
    releaseDate: '',
    imageLocation: '',
    rating: ''
  });

  const [initialFormData, setInitialFormData] = useState({
    name: '',
    duration: '',
    director: '',
    cast: '',
    genre: '',
    releaseDate: '',
    imageLocation: '',
    rating: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, imageLocation: file.name });
    }
  };

  const handleAddMovie = async (event) => {
    event.preventDefault();
    const isFormFilled = Object.values(formData).every(value => value.trim() !== '');
    if (isFormFilled) {
      try {
        const data = await postMovieData(formData);
        console.log(data);
      } catch (error) {
        console.log('There was an error!', error);
      }
    } else {
      alert('Please fill out all the fields.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.name.trim() === '') {
      alert('Please enter the name of the movie you want to update.');
      return;
    }

    const partialUpdateData = {};
    Object.keys(formData).forEach(key => {
      if (formData[key].trim() !== '' && formData[key] !== initialFormData[key]) {
        partialUpdateData[key] = formData[key];
      }
    });

    if (Object.keys(partialUpdateData).length > 0) {
      try {
        const data = await putMovieData(formData.name, partialUpdateData);
        console.log('Update successful:', data);
      } catch (error) {
        console.log('There was an error!', error);
      }
    } else {
      alert('Please fill out at least one additional field.');
    }
  };

  const handleDeleteMovie = async (event) => {
    event.preventDefault();
    if (formData.name.trim() !== '') {
      try {
        await deleteMovieData(formData.name);
        console.log('Movie deleted successfully');
      } catch (error) {
        console.log('There was an error!', error);
      }
    } else {
      alert('Please enter the movie name to delete.');
    }
  };

  return (
    <div>
      <h2 className="page-title">FILM EDIT</h2>
      <div className="nav-buttons">
        <Link to="/Admin" className="nav-button-management">DASHBOARD</Link>
        <Link to="/FilmForm" className="nav-button-management">FILM ADD/DELETE</Link>
        <Link to="/saloon-operation" className="nav-button-management">SEANS/SALOON EDITION</Link>
        <Link to="/UserManagement" className="nav-button-management">USER MANAGEMENT</Link>
        <Link to="/" className="nav-button-management">LOG OUT</Link>
      </div>
      <div className="film-form-wrapper">
        <div className="film-form-container">
          <div className="form-group">
            <h3>Movie Name:</h3>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </div>
          <h3>Movie Poster:</h3>
          <input type="file" name="imageLocation" onChange={handleFileChange} />
          {formData.imageLocation && (
            <img src={`path/to/images/${formData.imageLocation}`} alt="Movie Poster" className="poster-preview" />
          )}
        </div>
        <div className="film-form-container">
          <div className="form-group">
            <h3>Movie Duration:</h3>
            <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <h3>Genre:</h3>
            <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <h3>Release Date:</h3>
            <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} />
          </div>
        </div>
        <div className="film-form-container">
          <div className="form-group">
            <h3>Director:</h3>
            <input type="text" name="director" value={formData.director} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <h3>Cast:</h3>
            <input type="text" name="cast" value={formData.cast} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <h3>Rating:</h3>
            <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleInputChange} />
          </div>
        </div>
      </div>
      <div className="button-group">
        <button className="blue-btn" type="submit" onClick={handleSubmit}>Submit & Update</button>
        <button className="green-btn" onClick={handleAddMovie}>Add</button>
        <button className="red-btn" onClick={handleDeleteMovie}>Delete</button>
      </div>
    </div>
  );
};

export default FilmForm;
