import React, { useRef, useEffect, useState } from 'react';
import '../styles/RequestAmbulance.css';
import mapGif from '../images/map.gif';
import { Link } from "react-router-dom";

function RequestAmbulance() {
  const pickupRef = useRef(null);
  const dropRef = useRef(null);
  const [urgency, setUrgency] = useState('');

  useEffect(() => {
    if (window.google) {
      new window.google.maps.places.Autocomplete(pickupRef.current, {
        types: ['geocode'],
        componentRestrictions: { country: 'in' },
      });

      new window.google.maps.places.Autocomplete(dropRef.current, {
        types: ['establishment'],
        componentRestrictions: { country: 'in' },
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Requesting ambulance from ${pickupRef.current.value} to ${dropRef.current.value} with urgency: ${urgency}`);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="request-layout">
      <div className="fixed-navbar-container">
        <nav className="request-navbar">
          <div className="request-navbar-content">
            {/* Logo */}
            <div className="request-navbar-logo">
              <h2>Life+</h2>
            </div>

            {/* Navbar Links */}
            <div className={`request-navbar-links ${menuOpen ? 'open' : ''}`}>
              <Link className="request-nav-link" to="/track-ambulance">
                Track Ambulance
              </Link>
              <Link className="request-nav-link" to="/SignIn">
                Login
              </Link>
            </div>

            {/* Hamburger Icon */}
            <div className={`request-hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
          </div>
        </nav>
      </div>

      <div className="content-container">
        <div className="gif-section">
          <img src={mapGif} alt="Ambulance Moving" />
        </div>
        <div className="form-section">
          <div className="form-box">
            <h2>🚑 Book Your Emergency Ride</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Pickup Location"
                ref={pickupRef}
                required
              />
              <input
                type="text"
                placeholder="Drop-off (Hospital)"
                ref={dropRef}
                required
              />
              <select value={urgency} onChange={(e) => setUrgency(e.target.value)} required>
                <option value="">Select Urgency</option>
                <option value="non-urgent">Non-Urgent</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>
              <button type="submit">Book Now</button>
            </form>
          </div>
        </div>
        <div className="home-icon-below">
          <a href="/" className="home-icon">
            <i className="fa fa-home"></i>
            <span className="tooltip-text">Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RequestAmbulance;
