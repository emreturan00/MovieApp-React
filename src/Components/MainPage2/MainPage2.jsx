import React, { useState, useEffect } from 'react';
import './MainPage2.css'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import img1 from '../Assets/img5.png';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';

function MainPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:8080/api/movies')
            .then(response => response.json())
            .then(data => {
                // Map the fetched data to the format needed for sliderItems and thumbnailItems
                const sliderItems = data.map((item, index) => ({
                    id: index + 1,
                    ID: item.id,
                    image: require(`../Assets/${item.imageLocation}`), // Dynamically require the image
                    director: item.director, // Assuming the fetched data has an 'author' property
                    title: item.name, // Assuming the fetched data has a 'title' property
                    topic: 'MOVIE',
                    releaseDate: item.releaseDate,
                    genre: item.genre,
                    duration: item.duration,
                    cast: item.cast,
                    rating: item.rating,
                }));
    
                const thumbnailItems = data.map((item, index) => ({
                    id: index + 1,
                    ID: item.id,
                    image: require(`../Assets/${item.imageLocation}`), // Dynamically require the image
                    title: item.name, // Assuming the fetched data has a 'title' property
                    description: item.cast // Assuming the fetched data has a 'description' property
                }));

                const cardItems = data.map((item, index) => ({
                    id: index + 1,
                    ID: item.id,
                    image: require(`../Assets/${item.imageLocation}`), // Dynamically require the image
                    title: item.name, // Assuming the fetched data has a 'title' property
                    description: item.cast // Assuming the fetched data has a 'description' property
                }));


    
                // Set the state variables
                setSliderItems(sliderItems);
                setThumbnailItems(thumbnailItems);

                setCardItems(cardItems);
            });
    }, []);


    
    const [sliderItems, setSliderItems] = useState([]); 
    const [cardItems, setCardItems] = useState([]); 
    const [thumbnailItems, setThumbnailItems] = useState([]); 
    const [selectedItems, setSelectedItems] = useState([]); 
    const [locationMenuOpen, setLocationMenuOpen] = useState(false);
    const [genreMenuOpen, setGenreMenuOpen] = useState(false);
    
  

    // const Card = ({ title, copy, button }) => (
    //     <div className="card-currently">
    //       <div className="content-currently">
    //         <h2 className="title-currently">{title}</h2>
    //         <p className="copy-currently">{copy}</p>
    //         <Link to="/buy-ticket" className="btn-currently2" >BOOK NOW </Link>
    //       </div>
    //     </div>
    // );
    

    
    const showNextSlider = () => {
        const updatedSliderItems = [...sliderItems];
        const lastItem = updatedSliderItems.pop(); 
        updatedSliderItems.unshift(lastItem); 
        setSliderItems(updatedSliderItems);
    };

    
    const showPreviousSlider = () => {
        const updatedSliderItems = [...sliderItems];
        const firstItem = updatedSliderItems.shift(); 
        updatedSliderItems.push(firstItem); 
        setSliderItems(updatedSliderItems);
    };

    const handleButtonClick = (menuType) => {
        if (menuType === 'location') {
            setLocationMenuOpen(!locationMenuOpen);
            setGenreMenuOpen(false);
        } else if (menuType === 'genre') {
            setGenreMenuOpen(!genreMenuOpen);
            setLocationMenuOpen(false);
        }
    };

    
    const handleRemoveItem = (item) => {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    };

    
    const toggleLocationMenu = () => {
        setLocationMenuOpen(!locationMenuOpen);
    };

    
    const toggleGenreMenu = () => {
        setGenreMenuOpen(!genreMenuOpen);
    };

    const handleLocationClick = (location) => {
        setSelectedItems([...selectedItems, location]);
        setLocationMenuOpen(false);
    };

    const handleGenreClick = (genre) => {
        setSelectedItems([...selectedItems, genre]);
        setGenreMenuOpen(false);
    };
    
    return (
        <div>
            <h2>KHAS MOVIE</h2>
            <div className="horizontal-scroll2">
                <div className="scroll-section2">
                    <h1>Don't miss the special privileges for HAS MOVIE members</h1>
                </div>
            </div>

            <div className="nav-buttons">
                <Link to="/2" className="nav-button">HOME</Link>
                <Link to="/about-us2" className="nav-button">ABOUT US</Link>
                <Link to="/our-team2" className="nav-button">OUR TEAM</Link>
                <Link to="/my-profile" className="nav-button">MY PROFILE</Link>
            </div>

            <div className="carousel">
                <div className="list">
                    {sliderItems.map(item => (
                        <div className="item" key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <div className="content">
                                <div className="author">{item.author}</div>
                                <div className="title">{item.title}</div>
                                <div className="topic">{item.topic}</div>
                                <div className="des">{item.description}</div>
                                <div className="buttons">     
                                    <button 
                                        className="btn" 
                                        onClick={() => navigate('/buy-ticket2', { state: { movie: item } })}> 
                                        BUY TICKET
                                    </button>
                                    <button 
                                        className="btn" 
                                        onClick={() => navigate('/page2', { state: { movie: item } })}> 
                                        LOOK DETAILS
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="thumbnail">
                    {thumbnailItems.map(item => (
                        <div className="item" key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <div className="content">
                                <div className="title">{item.title}</div>
                                <div className="description">{item.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="arrows">
                    <button id="prev" onClick={showNextSlider}>&lt;</button>
                    <button id="next" onClick={showPreviousSlider}>&gt;</button>
                </div>
                <div className="time"></div>
            </div>

            <div className="content-wrapper">
                <div className="currently-showing">CURRENTLY SHOWING</div>
                <button class="choose-genre">Choose Genre</button>

                <div className="page-content-currently">
                    {cardItems.map((item, index) => (
                        <div key={index} className="movie-card">
                            <img src={item.image} alt={item.title}  />
                            <h2>{item.title}</h2>
                            <p>{item.copy}</p>
                            <button className="buy-ticket-button" onClick={() => navigate('/buy-ticket2', { state: { movie: item } })}>Buy Ticket</button>
                        </div>
                    ))}
                </div>
            </div>


            

{/* 
<div className="selected-items">
  
    <ul>
        {selectedItems.map((item, index) => (
            <li key={index}>
                {item}
                <button onClick={() => handleRemoveItem(item)}>x</button>
            </li>
        ))}
    </ul>
</div> */}

       

            <footer className="site-footer2">                        
                         <ul className="footer-links2">
                                <li><button>Home</button></li>
                                <li><button>Contact Us</button></li>
                                <li><button>About Us</button></li>
                                <li><button>My Profile</button></li>
                                <li><button>Log in</button></li>
                            </ul>
            </footer>

            
        </div>
    );
}

export default MainPage;