import React from 'react';
import disable from '../images/disable-removebg-preview.png'; // Updated image related to accessibility
import './header.css';

const Header: React.FC = () => (
  <div className="assist__header section__padding" id="home">
    <div className="assist__header-content">
      <h1 className="gradient__text">Let's Build a Future of Accessibility and Inclusion</h1>
      <p>
      Harness the power of technology to create solutions that support individuals with disabilities. Together, 
      we can foster an inclusive world where everyone has the tools they need to thrive and engage fully with society.
      </p>
      <div className="assist__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>
      <div className="assist__header-content__stats">
        <p>Over 2,000 people have joined us in our journey for accessibility in the last 24 hours.</p>
      </div>
    </div>
    <div className="assist__header-image">
      <img src={disable} alt="Accessibility Illustration" />
    </div>
  </div>
);

export default Header;
