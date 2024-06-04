import React from "react";
import "./Statistics.css";

const MainPage = () => {
  const handleMouseMove = (event) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--xPos", `${x}px`);
      card.style.setProperty("--yPos", `${y}px`);
    });
  };

  const titles = ["Daily Ticket Sales", "Weekly Film Performance", "Theatre Occupancy Rates", "Movie Scores", "Income and Expenses", "Membership"]; // Özelleştirilebilir başlık metinleri

  return (
    <>
      <div className="transparent-container">
        <div className="nav-buttons">
          <a href="#" className="nav-button">DASHBOARD</a>
          <a href="#" className="nav-button">FILM ADD/DELETE</a>
          <a href="#" className="nav-button">SEANS/SALOON EDITION</a>
          <a href="#" className="nav-button">REPORTS/STATISTICS</a>
          <a href="#" className="nav-button">USER MANAGEMENT</a>
        </div>
      </div>
      <div className="main-container">
        <div className="cards" onMouseMove={handleMouseMove}>
          <div className="card-group">
            {titles.slice(0, 2).map((title, index) => (
              <div className="card" key={index}>
                <div className="card-content"></div>
                <div className={`card-title-${index}`}>{title}</div>
                <div className="card-buttons">
                  <a href="#" className="blue-btn">daily</a>
                  <a href="#" className="blue-btn">weekly</a>
                  <a href="#" className="blue-btn">monthly</a>
                </div>
                <div className="card-info">NOT NOW</div>
              </div>
            ))}
          </div>
          <div className="card-group">
            {titles.slice(2, 4).map((title, index) => (
              <div className="card" key={index + 2}>
                <div className="card-content"></div>
                <div className={`card-title-${index + 2}`}>{title}</div>
                <div className="card-buttons">
                  <a href="#" className="blue-btn">daily</a>
                  <a href="#" className="blue-btn">weekly</a>
                  <a href="#" className="blue-btn">monthly</a>
                </div>
                <div className="card-info">NOT NOW</div>
              </div>
            ))}
          </div>
          <div className="card-group">
            {titles.slice(4).map((title, index) => (
              <div className="card lower-cards" key={index + 4}>
                <div className="card-content"></div>
                <div className={`card-title-${index + 4}`}>{title}</div>
                <div className="card-buttons">
                  <a href="#" className="blue-btn">daily</a>
                  <a href="#" className="blue-btn">weekly</a>
                  <a href="#" className="blue-btn">monthly</a>
                </div>
                <div className="card-info">NOT NOW</div>
              </div>
            ))}
          </div>
        </div>
        <div className="currently-showing"> STATISTICS</div>
      </div>
    </>
  );
};

export default MainPage;
