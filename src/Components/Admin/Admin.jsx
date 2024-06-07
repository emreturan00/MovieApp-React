import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Admin.css";

const MainPage = () => {
  const handleMouseMove = (event) => {
    const cards = document.querySelectorAll(".card-custom");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--xPos", `${x}px`);
      card.style.setProperty("--yPos", `${y}px`);
    });
  };

  const titles = ["Film Add/Delete", "Saloon/Seans Edition", "User Management"];
  const links = [
    "/FilmForm",  // Example paths to different pages
    "/saloon-operation",
    "/UserManagement",
  ];
  
  return (
    <div className="main-container-custom">
      <div className="cards-custom" onMouseMove={handleMouseMove}>
        {titles.map((title, index) => (
          <div className={`card-custom ${index >= 4 ? 'lower-cards-custom' : ''}`} key={index}>
            <div className="card-content-custom"></div>
            <div className={`card-title-custom-${index}`}>{title}</div>
            <div className="card-button-custom">
              <Link to={links[index]} className="blue-btn-custom">Details</Link>
            </div>
            <div className="card-info-custom">General Info</div>
          </div>
        ))}
      </div>
      <div className="currently-showing-custom">DASHBOARD</div>
    </div>
  );
};

export default MainPage;
