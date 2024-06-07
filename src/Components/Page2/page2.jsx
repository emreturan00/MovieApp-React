import React, { useState } from 'react';
import './page2.css';
import vizyon from '../Assets/vizyon.png';
import tur from '../Assets/tur.png';
import time from '../Assets/time.png';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Page = () => {
    const navigate = useNavigate();


    const location = useLocation();
    const movie = location.state ? location.state.movie : null;
    console.log(movie);
    const [isFavorited, setIsFavorited] = useState(false);
    const [rating, setRating] = useState(0);

    const handleFavorite = async (movieId) => {
        const response = await fetch(`http://localhost:8080/api/users/favorite/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Include additional headers if needed, like authorization tokens
            },
        });
    
        if (response.ok) {
            setIsFavorited(!isFavorited);
        } else {
            console.error('Failed to favorite movie');
        }
    };

    const handleRating = (value) => {
        setRating(value);
    };

    // Sabit bir IMDB puanı varsayalım (örneğin, 7.8)
    const imdbRating = 7.8;

    if (!movie) {
        return <div>No movie data available</div>;
    }

    return (
        <div className="page">
            <div className="nav-buttons5">
                <Link to="/" className="nav-button">HOME</Link>
                <Link to="/about-us" className="nav-button">ABOUT US</Link>
                <Link to="/our-team" className="nav-button">OUR TEAM</Link>
                <Link to="/my-profile" className="nav-button">MY PROFILE</Link>
            </div>
            <div className="film-info">
                <div className="film-image">
                    <img src={movie.image} alt="Titanic Resmi"/>
                    <div className="vizyon-info">
                        <img src={vizyon} alt="Vizyon Tarihi"/> <p>{movie.releaseDate}</p>
                    </div>
                    <div className="tur-info">
                        <img src={tur} alt="Tür"/> <p>{movie.genre}</p>
                    </div>
                    <div className="time-info">
                        <img src={time} alt="Time"/> <p>{movie.duration}</p>
                    </div>
                </div>
                <div className="film-details">
                    <h2 className="neon-blue">{movie.name}</h2>
                    <h3>Director: {movie.director}</h3>
                    <h3>Cast: {movie.cast}</h3>
                    <p className="neon-blue">{movie.description}</p>
                    <p className="film-plot">{movie.description}</p>
                    <div className="rating">
                        <span>Your Score: {rating}</span>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={star <= rating ? 'filled' : ''}
                                    onClick={() => handleRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="imdb-rating">
                        <span>IMDB: {imdbRating}</span>
                    </div>
                </div>
            </div>
            <div className="actions">
                <div className="buttons">
                    <button className="blue-btnp" onClick={() => handleFavorite(movie.ID)}>
                        {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                    <button 
                        className="btn" 
                        onClick={() => navigate('/buy-ticket2', { state: { movie } })}> 
                        BUY TICKET
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
