import React, { useState, useEffect } from 'react';
import './cookies.css';

const CookieConsent = () => {

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };


  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };


  const [showBanner, setShowBanner] = useState(!getCookie('cookies_accepted'));


  useEffect(() => {

    if (getCookie('cookies_accepted')) {
      setShowBanner(false);
    }
  }, []);


  const handleAccept = () => {
    setCookie('cookies_accepted', 'true', 365);
    setShowBanner(false);
  };

  // Maneja el clic en "Rejeter"
  const handleReject = () => {
    setCookie('cookies_accepted', 'false', 365);
    setShowBanner(false);
  };


  if (!showBanner) return null;

  return (

    <div className="cookie-banner">
      <h3>Nous respectons votre vie privée.</h3>
      <p>Nous utilisons des cookies pour améliorer votre expérience de navigation, diffuser des publicités ou des contenus personnalisés et analyser notre trafic.</p>
      <button onClick={handleAccept} className="cookie-button">Accepter</button>
      <button onClick={handleReject} className="cookie-button">Refuser</button>
    </div>
  );
};

export default CookieConsent;

