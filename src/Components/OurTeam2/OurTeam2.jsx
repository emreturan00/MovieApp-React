import React from 'react';
import './OurTeam2.css'; 
import Gokce from '../Assets/Gokce.jpeg';
import Buket from '../Assets/Buket.jpeg';
import Gaye from '../Assets/Gaye.jpeg';
import Ayberk from '../Assets/Ayberk.jpeg';
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <div>
            <div className="nav-buttons3">
            <Link to="/2" className="nav-button">HOME</Link>
            <Link to="/about-us2" className="nav-button">ABOUT US</Link>
            <Link to="/our-team2" className="nav-button">OUR TEAM</Link>
            <Link to="/my-profile" className="nav-button">MY PROFILE</Link>
            </div>

            <div className="imagecontainer3">
                <div className="image-container3">
                    <img src={Gokce} alt="Gokce" className="image3" />
                    <p>Gökçenur Koçak: gokcenur.kocak@stu.khas.edu.tr</p>
                </div>
                <div className="image-container3">
                    <img src={Buket} alt="Buket" className="image3" />
                    <p>Buket Arslan: buketarslan@stu.khas.edu.tr</p>
                </div>
                <div className="image-container3">
                    <img src={Gaye} alt="Gaye" className="image3" />
                    <p>Gaye Aksoy: gayee.aksoy@stu.khas.edu.tr</p>
                </div>
                <div className="image-container3">
                    <img src={Ayberk} alt="Ayberk" className="image3" />
                    <p>Ayberk Dinçkol: ayberk.dinckol@stu.khas.edu.tr</p>
                </div>
            </div>

            <footer className="site-footer3">
                <div className="container3">
                    <div className="row">
                        <div className="col-xs-6 col-md-3 text-center">
                            <h6 className="footer-title3">CURRENTLY SHOWING</h6>
                            <ul className="footer-links3">
                                <li><button>CS1</button></li>
                                <li><button>CS2</button></li>
                                <li><button>CS3</button></li>
                                <li><button>CS4</button></li>
                                <li><button>CS5</button></li>
                                <li><button>CS6</button></li>
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3 text-center">
                            <h6 className="footer-title3">COMING SOON</h6>
                            <ul className="footer-links3">
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