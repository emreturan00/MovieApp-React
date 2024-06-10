import './BiletAl2.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const BiletAlSayfasi = ({ ogrenciBiletSayisi, setOgrenciBiletSayisi, tamBiletSayisi, setTamBiletSayisi}) => {

  const [sinemalar, setSinemalar] = useState([]);
  const [selectedCinemaPrice, setSelectedCinemaPrice] = useState(null);
  const [secilenKoltuklar, setSecilenKoltuklar] = useState([]);
  const [cevap, setCevap] = useState([]);

  const tarihler = ['2024-04-24', '2024-04-25', '2024-04-26'];
  const seanslar = ['10:00', '13:00', '16:00'];
  const ogrenciPrice = selectedCinemaPrice * 0.8; // price for one student ticket
  const tamPrice = selectedCinemaPrice; // price for one adult ticket
  const [totalPrice, setTotalPrice] = useState(0);  

  const location = useLocation();
  const movie = location.state ? location.state.movie : null;

  const [secilenSinema, setSecilenSinema] = useState('');
  const [secilenTarih, setSecilenTarih] = useState('');
  const [secilenSeans, setSecilenSeans] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  }, [secilenKoltuklar]);

  useEffect(() => {
    fetch('http://localhost:8080/api/cinemas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching cinemas');
        }
        return response.json();
      })
      .then(data => {
        const cinemas = data.map((item, index) => ({
          id: parseInt(index) + 1, // Convert index to integer
          ID: item.id,
          name: item.name,
          price: item.price
        }));
        setSinemalar(cinemas);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const getSeatsBySelections = async () => {
    if (!movie || !secilenSinema || !secilenTarih || !secilenSeans) return;

    try {
      const response = await fetch('http://localhost:8080/api/biletal/getSeatsBySelections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secilenFilm: movie.ID,
          secilenSinema: secilenSinema,
          secilenTarih: secilenTarih,
          secilenSeans: secilenSeans,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseSecilenKoltuklar = await response.json();
      console.log('Response:', responseSecilenKoltuklar);
      setSecilenKoltuklar(responseSecilenKoltuklar);
      return responseSecilenKoltuklar;
    } catch (error) {
      console.error('An error occurred while fetching seats:', error);
    }
  };

  useEffect(() => {
    if (secilenSinema && secilenTarih && secilenSeans) {
      getSeatsBySelections();
    }
  }, [secilenSinema, secilenTarih, secilenSeans]);

  const handleSinemaSecim = (sinemaId) => {
    const selectedCinema = sinemalar.find(sinema => sinema.ID === parseInt(sinemaId)); // Convert sinemaId to integer
    if (selectedCinema) {
      setSelectedCinemaPrice(selectedCinema.price);
    } else {
      console.log("Cinema not found");
      setSelectedCinemaPrice(null);
    }
    setSecilenSinema(sinemaId);
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
    const newOgrenciBiletSayisi = ogrenciBiletSayisi + 1;
    setOgrenciBiletSayisi(newOgrenciBiletSayisi);
    const newTotalPrice = newOgrenciBiletSayisi * ogrenciPrice + tamBiletSayisi * tamPrice;
    setTotalPrice(newTotalPrice);
  };
  
  const handleOgrenciAzalt = () => {
    if (ogrenciBiletSayisi > 0) {
      const newOgrenciBiletSayisi = ogrenciBiletSayisi - 1;
      setOgrenciBiletSayisi(newOgrenciBiletSayisi);
      const newTotalPrice = newOgrenciBiletSayisi * ogrenciPrice + tamBiletSayisi * tamPrice;
      setTotalPrice(newTotalPrice);
    }
  };
  
  const handleTamArtir = () => {
    const newTamBiletSayisi = tamBiletSayisi + 1;
    setTamBiletSayisi(newTamBiletSayisi);
    const newTotalPrice = ogrenciBiletSayisi * ogrenciPrice + newTamBiletSayisi * tamPrice;
    setTotalPrice(newTotalPrice);
  };
  
  const handleTamAzalt = () => {
    if (tamBiletSayisi > 0) {
      const newTamBiletSayisi = tamBiletSayisi - 1;
      setTamBiletSayisi(newTamBiletSayisi);
      const newTotalPrice = ogrenciBiletSayisi * ogrenciPrice + newTamBiletSayisi * tamPrice;
      setTotalPrice(newTotalPrice);
    }
  };

  const handleSubmit = async () => {
    const biletAlData = {
      secilenFilm: movie.ID,
      secilenSinema,
      secilenTarih,
      secilenSeans,
      ogrenciBiletSayisi,
      tamBiletSayisi,
      price: totalPrice
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
        alert('Ticket successfully saved!');
        const gelen = await getSeatsBySelections();
        setCevap(gelen);
        navigate('/seats2', { 
          state: { 
            totalPrice: totalPrice,
            cevap: gelen
          } 
        });
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
    setTotalPrice(0);
  };

  return (
    <div className="bilet-al-container">  
      <div className="nav-buttons">
        <Link to="/2" className="nav-button">HOME</Link>
        <Link to="/about-us2" className="nav-button">ABOUT US</Link>
        <Link to="/our-team2" className="nav-button">OUR TEAM</Link>
        <Link to="/my-profile" className="nav-button">MY PROFILE</Link>
      </div>
      <h1>Ticket Selection Screen</h1>
      <div className="secimler">
        <div className="secim">
          <label>Cinema Selection:</label>
          <select value={secilenSinema} onChange={(e) => handleSinemaSecim(e.target.value)}>
            <option value="">Please choose a cinema</option>
            {sinemalar.map((sinema, index) => (
              <option key={sinema.id} value={sinema.ID}>{sinema.name}</option>
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
          {selectedCinemaPrice && (
            <span className="secimler">
              Price: {totalPrice} TL
            </span>
          )}
        </div>
      </div>
      <img src={movie.image} alt={movie.name} className="film-posteri" />
      <div className="film-adi">{movie.name}</div>
      <button
        className="blue-btn6"
        disabled={!secilenSinema || !secilenTarih || !secilenSeans || (ogrenciBiletSayisi === 0 && tamBiletSayisi === 0)}
        onClick={handleSubmit}
      >
        Seat Selection
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default BiletAlSayfasi;
