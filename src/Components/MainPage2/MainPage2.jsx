import React, { useState, useEffect } from 'react';
import './MainPage2.css'; 
import { Link } from 'react-router-dom';

import img1 from '../Assets/img5.png';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';

function MainPage() {
    
    const [sliderItems, setSliderItems] = useState([]); 
    const [thumbnailItems, setThumbnailItems] = useState([]); 
    const [selectedItems, setSelectedItems] = useState([]); 
    const [locationMenuOpen, setLocationMenuOpen] = useState(false);
    const [genreMenuOpen, setGenreMenuOpen] = useState(false);
    
    const cards = [
        { title: 'Movie 1', copy: 'description of Movie 1', button: 'Book Now' },
        { title: 'Movie 2', copy: 'description of Movie 2', button: 'Book Now' },
        { title: 'Movie 3', copy: 'description of Movie 3', button: 'Book Now' },
        { title: 'Movie 4', copy: 'description of Movie 4', button: 'Book Now' }
    ];

    const Card = ({ title, copy, button }) => (
        <div className="card-currently">
          <div className="content-currently">
            <h2 className="title-currently">{title}</h2>
            <p className="copy-currently">{copy}</p>
            <Link to="/buy-ticket2" className="btn-currently2">{button}</Link>
          </div>
        </div>
    );

    // useEffect and other will be added
    useEffect(() => {
        // Slider ve thumbnail 
        
        setSliderItems([
            { id: 1, image: img1, author: 'ROMANCE', title: 'TITANIC', topic: 'MOVIE', description: 'MOVIE 1' },
            { id: 2, image: img2, author: 'FANTASY', title: 'DESIGN SLIDER', topic: 'MOVIE', description: 'MOVIE 2' },
            { id: 3, image: img3, author: 'SCI-FI', title: 'DESIGN SLIDER', topic: 'MOVIE', description: 'MOVIE 3' },
            { id: 4, image: img4, author: 'ADVENTURE', title: 'DESIGN SLIDER', topic: 'MOVIE', description: 'MOVIE 4' }
        ]);
        setThumbnailItems([
            { id: 1, image: img1, title: 'Name Slider', description: 'Description' },
            { id: 2, image: img2, title: 'Name Slider', description: 'Description' },
            { id: 3, image: img3, title: 'Name Slider', description: 'Description' },
            { id: 4, image: img4, title: 'Name Slider', description: 'Description' }
        ]);
    }, []); 

    
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
                <Link to="/our-team" className="nav-button">OUR TEAM</Link>
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
                                    <Link to="/buy-ticket2">
                                    <button>BUY TICKET</button>
                                    </Link>
                                    <Link to="/page2">
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