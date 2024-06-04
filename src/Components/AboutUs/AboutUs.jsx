import React from 'react';
import './AboutUs.css'; 
import { Link } from 'react-router-dom';

import Khas1 from '../Assets/Khas1.png';
import Khas2 from '../Assets/Khas2.png';
import Khas3 from '../Assets/Khas3.png';

function MainPage() {
    return (
        <div>
            <div className="nav-buttons1">
                <Link to="/" className="nav-button">HOME</Link>
                <Link to="/about-us" className="nav-button">ABOUT US</Link>
                <Link to="/our-team" className="nav-button">OUR TEAM</Link>
                <Link to="/login" className="nav-button">LOGIN/SIGNUP</Link>
            </div>

            <div className="images-container">
                <div className="image-container1">
                    <img src={Khas1} alt="Image 1" className="image" />
                    <div className="image-text" >Cibali Location: <span style={{fontWeight: 'normal'}}>Kadir Has Cd., 34083 Cibali / Fatih/Istanbul</span></div>
                </div>
                <div className="image-container1">
                    <img src={Khas2} alt="Image 2" className="image" />
                    <div className="image-text">Selimpaşa Location: <span style={{fontWeight: 'normal'}}>Büyükçekmece Silivri Yolu, 34590 Silivri/Istanbul</span></div>
                </div>
                <div className="image-container1">
                    <img src={Khas3} alt="Image 3" className="image" />
                    <div className="image-text">Bahçelievler Location: <span style={{fontWeight: 'normal'}}>Mehmetçik Sk. No:1, 34180 Bahçelievler/Istanbul</span></div>
                </div>
            </div>

            <footer className="site-footer1">
                <div className="container100">
                    <div className="row">
                        <div className="col-xs-6 col-md-3 text-center1">
                            <h6 className="footer-title1">CURRENTLY SHOWING</h6>
                            <ul className="footer-links1">
                                <li><button>CS1</button></li>
                                <li><button>CS2</button></li>
                                <li><button>CS3</button></li>
                                <li><button>CS4</button></li>
                                <li><button>CS5</button></li>
                                <li><button>CS6</button></li>
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3 text-center">
                            <h6 className="footer-title1">COMING SOON</h6>
                            <ul className="footer-links1">
                                <li><button>Home</button></li>
                                <li><button>Contact Us</button></li>
                                <li><button>About Us</button></li>
                                <li><button>My Profile</button></li>
                                <li><button>Log in</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default MainPage;