import React, { useState } from 'react';
import './FilmForm.css'; 


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

async function putMovieData(formData) {
  const response = await fetch('http://localhost:8080/api/movies', {
    method: 'PUT',
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


async function deleteMoiveData(formData) {
  const response = await fetch('http://localhost:8080/api/movies/${formData}', {
    method: 'DELETE',
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

const FilmForm = () => {
  // State kullanarak form verilerini tut
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    director: '',
    actors: '',
    genre: '',
    releaseDate: '',
    poster: '' // Yeni eklenen alan: Film afişi
  });

  // Form verilerini güncelle
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };



  // Yeni film ekleme işlemi
const handleAddMovie = async(event) => {
  // Tüm form alanlarının doldurulduğunu kontrol et
  const isFormFilled = Object.values(formData).every(value => value.trim() !== '');
  if (isFormFilled) {
    console.log('Add Movie button clicked');
    // Yeni film ekleme işlemleri burada gerçekleştirilebilir
    event.preventDefault();
    try {
      const data = await postMovieData(formData);
      console.log(data);
    } catch (error) {
      console.log('There was an error!', error);
    }
    console.log(formData);
  } else {
    alert('Please fill out all the fields.');
  }
};

// Form submit işlemi
const handleSubmit = async (event) => {
  event.preventDefault();
  
  // Güncellenmek istenen filmin adının doldurulduğunu kontrol et
  if (formData.name.trim() === '') {
    alert('Please enter the name of the movie you want to update.');
    return;
  }
  
  // En az bir başka alanın doldurulduğunu kontrol et
  const isAtLeastOneFieldFilled = Object.entries(formData).some(
    ([key, value]) => key !== 'name' && value.trim() !== ''
  );
  
  if (isAtLeastOneFieldFilled) {
    console.log('Submit button clicked');
    // Form verilerini kullanarak bir işlem yapılabilir (örneğin, API'ye gönderme)
    try {
      const data = await putMovieData(formData);
      console.log(data);
    } catch (error) {
      console.log('There was an error!', error);
    }
    console.log(formData);
  } else {
    alert('Please fill out at least one additional field.');
  }
};


// Film silme işlemi
const handleDeleteMovie = async (event) => {
  // Sadece film ismi girilmişse silme işlemi gerçekleştir
  if (formData.name.trim() !== '') {
    console.log('Delete Movie button clicked');
    // Silme işlemleri burada gerçekleştirilebilir
    event.preventDefault();
    try {
      const data = await deleteMoiveData(formData.name  );
      console.log(data);
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
        <a href="#" className="nav-button">DASHBOARD</a>
        <a href="#" className="nav-button">FILM EDIT</a>
        <a href="#" className="nav-button">SEANS/SALOON EDITION</a>
        <a href="#" className="nav-button">REPORTS/STATISTICS</a>
        <a href="#" className="nav-button">USER MANAGEMENT</a>
      </div>
      <div className="film-form-wrapper">
        {/* İlk film formu */}
        <div className="film-form-container">
          <div className="form-group">
            <h3>Movie Name:</h3>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </div>
          <h3>Movie Poster:</h3>
          <input type="file" name="poster" onChange={handleInputChange} />
          {formData.poster && (
            <img src={formData.poster} alt="Movie Poster" className="poster-preview" />
          )}
        </div>
        {/* İkinci film formu */}
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
        {/* Üçüncü film formu */}
        <div className="film-form-container">
          <div className="form-group">
            <h3>Director:</h3>
            <input type="text" name="director" value={formData.director} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <h3>Cast:</h3>
            <input type="text" name="actors" value={formData.actors} onChange={handleInputChange} />
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
