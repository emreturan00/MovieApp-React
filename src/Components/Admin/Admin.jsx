
import React from "react";
import "./Admin.css";

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

  const titles = ["Movie Editing", "Organizing a Session", "Hall Management", "Ticket Sales Reports", "User Management", "Avatar Editing"]; // Özelleştirilebilir başlık metinleri

  return (
    <div className="main-container99">
      <div className="cards99" onMouseMove={handleMouseMove}>
        {titles.map((title, index) => (
          <div className={`card99 ${index >= 4 ? 'lower-cards99' : ''}`} key={index}>
            <div className="card-content99"></div>
            <div className={`card-title99-${index}`}>{title}</div>
            <div className="card-button99">
              <a href="#" className="blue-btn99">Details</a>
            </div>
            <div className="card-info99">General Info</div>
          </div>
        ))}
      </div>
      <div className="currently-showing99">ADMIN</div>
    </div>
  );
};

export default MainPage;
