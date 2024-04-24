import React, { useEffect } from "react";
import './adminnav.css'
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom

const AdminNavbar = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");

    const handleClick = () => {
      // Animate Links
      navLinks.classList.toggle("open");
      links.forEach((link) => {
        link.classList.toggle("fade");
      });

      // Hamburger Animation
      hamburger.classList.toggle("toggle");
    };

    hamburger.addEventListener("click", handleClick);

    // Cleanup function to remove event listener
    return () => {
      hamburger.removeEventListener("click", handleClick);
    };
  }, []); // Empty dependency array means it will run only once on component mount

   const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/');
    window.location.reload();

  };

  return (
    <div>
      <nav>
        <div class="logo">
          <img src="./Product_images/company_logo.jpg" alt="Logo Image" />
        </div>
        <div class="hamburger">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
        <ul class="nav-links">
          <li>
            <a href="/adminconsole">Home</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a className="login-button" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavbar;
