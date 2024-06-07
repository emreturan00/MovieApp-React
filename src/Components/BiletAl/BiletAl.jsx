import React, { useState } from 'react';
import './BiletAl.css';
import titanic from '../Assets/titanic.png';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const BiletAlSayfasi = () => {
  const [secilenSinema, setSecilenSinema] = useState('');
  const [secilenTarih, setSecilenTarih] = useState('');
  const [secilenSeans, setSecilenSeans] = useState('');
  const [ogrenciBiletSayisi, setOgrenciBiletSayisi] = useState(0);
  const [tamBiletSayisi, setTamBiletSayisi] = useState(0);

  const navigate = useNavigate(); // useNavigate hook'unu kullanarak navigate işlevini oluşturun

  const sinemalar = ['Cinema 1', 'Cinema 2', 'Cinema 3'];
  const tarihler = ['2024-04-24', '2024-04-25', '2024-04-26'];
  const seanslar = ['10:00', '13:00', '16:00'];

  const handleSinemaSecim = (sinema) => {
    setSecilenSinema(sinema);
    setSecilenTarih('');
    setSecilenSeans('');
  };

  const handleTarihSecim = (tarih) => {
    setSecilenTarih(tarih);
    setSecilenSeans('');
  };

  const handleSeansSecim = (seans) => {
    setSecilenSeans(seans);
  };

  const handleOgrenciArtir = () => {
    setOgrenciBiletSayisi(prevSayi => prevSayi + 1);
  };

  const handleOgrenciAzalt = () => {
    if (ogrenciBiletSayisi > 0) {
      setOgrenciBiletSayisi(prevSayi => prevSayi - 1);
    }
  };

  const handleTamArtir = () => {
    setTamBiletSayisi(prevSayi => prevSayi + 1);
  };

  const handleTamAzalt = () => {
    if (tamBiletSayisi > 0) {
      setTamBiletSayisi(prevSayi => prevSayi - 1);
    }
  };

  const handleSubmit = async () => {
    const biletAlData = {
      secilenSinema,
      secilenTarih,
      secilenSeans,
      ogrenciBiletSayisi,
      tamBiletSayisi
    };

    try {
      const response = await fetch('http://localhost:8080/api/biletal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(biletAlData)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('MySQL response:', responseData);
        alert('Ticket successfully saved!');
        handleReset();
        navigate('/seats2'); // Veri kaydetme işlemi başarılı olduğunda kullanıcıyı yönlendirin
      } else {
        const errorData = await response.json();
        console.error('Error saving ticket:', errorData);
        alert('Error saving ticket!');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while saving the ticket!');
    }
  };

  const handleReset = () => {
    setSecilenSinema('');
    setSecilenTarih('');
    setSecilenSeans('');
    setOgrenciBiletSayisi(0);
    setTamBiletSayisi(0);
  };

  return (
    <div className="bilet-al-container">
      <div className="nav-buttons">
        <Link to="/" className="nav-button">HOME</Link>
        <Link to="/about-us" className="nav-button">ABOUT US</Link>
        <Link to="/our-team" className="nav-button">OUR TEAM</Link>
        <Link to="/login" className="nav-button">LOGIN/SIGNUP</Link>
      </div>
      <h1>Ticket Selection Screen</h1>
      <div className="secimler">
        <div className="secim">
          <label>Cinema Selection:</label>
          <select value={secilenSinema} onChange={(e) => handleSinemaSecim(e.target.value)}>
            <option value="">Please choose a cinema</option>
            {sinemalar.map((sinema, index) => (
              <option key={index} value={sinema}>{sinema}</option>
            ))}
          </select>
        </div>
        <div className="secim">
          <label>Date Selection:</label>
          <select value={secilenTarih} onChange={(e) => handleTarihSecim(e.target.value)} disabled={!secilenSinema}>
            <option value="">Please select a date</option>
            {tarihler.map((tarih, index) => (
              <option key={index} value={tarih}>{tarih}</option>
            ))}
          </select>
        </div>
        <div className="secim">
          <label>Session Selection:</label>
          <select value={secilenSeans} onChange={(e) => handleSeansSecim(e.target.value)} disabled={!secilenTarih}>
            <option value="">Please select a session</option>
            {seanslar.map((seans, index) => (
              <option key={index} value={seans}>{seans}</option>
            ))}
          </select>
        </div>
        <div className="bilet-sayac">
          <label>Student:</label>
          <button onClick={handleOgrenciAzalt}>-</button>
          <span className="bilet-sayac-yazi">{ogrenciBiletSayisi}</span>
          <button onClick={handleOgrenciArtir}>+</button>
        </div>

        <div className="bilet-sayac2">
          <label>Adult: </label>
          <button onClick={handleTamAzalt}>-</button>
          <span className="bilet-sayac-yazi">{tamBiletSayisi}</span>
          <button onClick={handleTamArtir}>+</button>
        </div>
      </div>
      <img src={titanic} alt="Titanic" className="film-posteri" />
      <div className="film-adi">TITANIC</div>

      <button
        className="blue-btn"
        disabled={!secilenSinema || !secilenTarih || !secilenSeans || (ogrenciBiletSayisi === 0 && tamBiletSayisi === 0)}
        onClick={handleSubmit}> Seat Selection
      </button>

    </div>
  );
};

export default BiletAlSayfasi;
