import React, { useEffect } from "react";
import './navbar.css'
const Navbar = () => {
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

  return (
    <div>
      <nav>
        <div class="logo">
          <img src="https://w7.pngwing.com/pngs/54/626/png-transparent-home-appliance-home-appliance-washing-machine-rice-cooker-refrigerator-home-appliances-kitchen-furniture-service.png" alt="Logo Image" />
        </div>
        <div class="hamburger">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
        <ul class="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Solutions</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a className="login-button" href="/login">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
