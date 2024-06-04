import React, { useState, useEffect } from 'react';
import './MainPage.css'; 
import { Link } from 'react-router-dom';

import img1 from '../Assets/img5.png';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';

function MainPage() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:8080/api/movies')
            .then(response => response.json())
            .then(data => {
                // Map the fetched data to the format needed for sliderItems and thumbnailItems
                const sliderItems = data.map((item, index) => ({
                    id: index + 1,
                    image: require(`../Assets/${item.imageLocation}`), // Dynamically require the image
                    author: item.director, // Assuming the fetched data has an 'author' property
                    title: item.name, // Assuming the fetched data has a 'title' property
                    topic: 'MOVIE',
                    description: item.cast // Assuming the fetched data has a 'description' property
                }));
    
                const thumbnailItems = data.map((item, index) => ({
                    id: index + 1,
                    image: require(`../Assets/${item.imageLocation}`), // Dynamically require the image
                    title: item.name, // Assuming the fetched data has a 'title' property
                    description: item.cast // Assuming the fetched data has a 'description' property
                }));
    
                // Set the state variables
                setSliderItems(sliderItems);
                setThumbnailItems(thumbnailItems);
            });
    }, []);


    
    const [sliderItems, setSliderItems] = useState([]); 
    const [thumbnailItems, setThumbnailItems] = useState([]); 
    const [selectedItems, setSelectedItems] = useState([]); 
    const [locationMenuOpen, setLocationMenuOpen] = useState(false);
    const [genreMenuOpen, setGenreMenuOpen] = useState(false);
    
  

    const Card = ({ title, copy, button }) => (
        <div className="card-currently">
          <div className="content-currently">
            <h2 className="title-currently">{title}</h2>
            <p className="copy-currently">{copy}</p>
            <Link to="/buy-ticket" className="btn-currently2">{button}</Link>
          </div>
        </div>
    );
    

    
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
                <Link to="/" className="nav-button">HOME</Link>
                <Link to="/about-us" className="nav-button">ABOUT US</Link>
                <Link to="/our-team" className="nav-button">OUR TEAM</Link>
                <Link to="/login" className="nav-button">LOGIN/SIGNUP</Link>
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
                                    <Link to="/buy-ticket">
                                    <button>BUY TICKET</button>
                                    </Link>
                                    <Link to="/page">
                                    <button>LOOK DETAILS </button>
                                    </Link>
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
                    <button id="prev" onClick={showPreviousSlider}>&lt;</button>
                    <button id="next" onClick={showNextSlider}>&gt;</button>
                </div>
                <div className="time"></div>
            </div>

            <div className="coming-soon">COMING SOON</div>
            <div className="currently-showing">CURRENTLY SHOWING</div>
            <div className="container2">
                <div className="card">
                    <img className="background" src={img1} alt="" />
                    <div className="card-content">
                        <h3 className="title">COMING SOON 1</h3>
                    </div>
                    <div className="backdrop"></div>
                </div>

                <div className="card">
                    <img className="background" src={img2} alt="" />
                    <div className="card-content">
                        <h3 className="title">COMING SOON 2</h3>
                    </div>
                    <div className="backdrop"></div>
                </div>

                <div className="card">
                    <img className="background" src={img3} alt="" />
                    <div className="card-content">
                        <h3 className="title">COMING SOON 3</h3>
                    </div>
                    <div className="backdrop"></div>
                </div>

                <div className="card">
                    <img className="background" src={img4} alt="" />
                    <div className="card-content">
                        <h3 className="title">COMING SOON 4</h3>
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
            <div className="page-content-currently"> {/* Updated class name */}
            {cards.map((card, index) => (
            <Card key={index} title={card.title} copy={card.copy} button={card.button} />
            ))}
            </div>

            <div className="btns2">
            <a
    className={`blue-btn2 ${locationMenuOpen ? 'active' : ''}`}
    href="#"
    onClick={(e) => handleButtonClick('location', e)}
    aria-expanded={locationMenuOpen}
>
    Choose Location
</a>
{locationMenuOpen && (
    <div className="menu" onClick={(e) => e.stopPropagation()}>
        <a href="#" onClick={() => handleLocationClick('Option 1')}>Option 1</a>
        <a href="#" onClick={() => handleLocationClick('Option 2')}>Option 2</a>
        <a href="#" onClick={() => handleLocationClick('Option 3')}>Option 3</a>
    </div>
)}

<a
    className={`blue-btn2 ${genreMenuOpen ? 'active' : ''}`}
    href="#"
    onClick={(e) => handleButtonClick('genre', e)}
    aria-expanded={genreMenuOpen}
>
    Choose Genre
</a>
{genreMenuOpen && (
    <div className="menu" onClick={(e) => e.stopPropagation()}>
        <a href="#" onClick={() => handleGenreClick('Action')}>Action</a>
        <a href="#" onClick={() => handleGenreClick('Comedy')}>Comedy</a>
        <a href="#" onClick={() => handleGenreClick('Drama')}>Drama</a>
        <a href="#" onClick={() => handleGenreClick('Horror')}>Horror</a>
        <a href="#" onClick={() => handleGenreClick('Romance')}>Romance</a>
        <a href="#" onClick={() => handleGenreClick('Sci-Fi')}>Sci-Fi</a>
        <a href="#" onClick={() => handleGenreClick('Thriller')}>Thriller</a>
        <a href="#" onClick={() => handleGenreClick('Western')}>Western</a>
    </div>
)}


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

       

            <footer className="site-footer2">
                <div className="container2">
                    <div className="row">
                        <div className="col-xs-6 col-md-3 text-center">
                            <h6 className="footer-title2">CURRENTLY SHOWING</h6>
                            <ul className="footer-links2">
                                <li><button>CS1</button></li>
                                <li><button>CS2</button></li>
                                <li><button>CS3</button></li>
                                <li><button>CS4</button></li>
                                <li><button>CS5</button></li>
                                <li><button>CS6</button></li>
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3 text-center">
                            <h6 className="footer-title2">COMING SOON</h6>
                            <ul className="footer-links2">
                                <li><button>Home</button></li>
                                <li><button>Contact Us</button></li>
                                <li><button>About Us</button></li>
                                <li><button>My Profile</button></li>
                                <li><button>Log in</button></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                </div>
            </footer>

            
        </div>
    );
}

export default MainPage;