// deneme push



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPage from './Components/MainPage/MainPage';
import AboutUs from './Components/AboutUs/AboutUs';
import AboutUs2 from './Components/AboutUs2/AboutUs2';
import OurTeam from './Components/OurTeam/OurTeam';
import OurTeam2 from './Components/OurTeam2/OurTeam2';
import Login from './Components/Login/Login';
import BuyTicket from './Components/BiletAl/BiletAl';
import BuyTicket2 from './Components/BiletAl2/BiletAl2';
import Page from './Components/Page/page';
import Page2 from './Components/Page2/page2';
import Seats from './Components/Seats/Seats';
import Signup from './Components/Signup/Signup';
import MainPage2 from './Components/MainPage2/MainPage2'; 
import MyProfile from './Components/MyProfile/MyProfile'; 
import Seats2 from './Components/Seats2/Seats2';
import Payment from './Components/Payment/Payment';
import SaloonOperation from './Components/SaloonOperation/SaloonOperation';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buy-ticket" element={<BuyTicket />} />
          <Route path="/page" element={<Page/>} />
          <Route path="/seats" element={<Seats/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/2" element={<MainPage2/>} />
          <Route path="/my-profile" element={<MyProfile/>} />
          <Route path="/about-us2" element={<AboutUs2 />} />
          <Route path="/our-team2" element={<OurTeam2 />} />
          <Route path="/page2" element={<Page2/>} />
          <Route path="/buy-ticket2" element={<BuyTicket2 />} />
          <Route path="/seats2" element={<Seats2/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/saloon-operation" element={<SaloonOperation/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;