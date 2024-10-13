import React from 'react'
import { HashRouter as Router } from 'react-router-dom'; ``
import AppRouter from './components/routes/AppRouter';
import Navbar from './components/organisms/navbar/Navbar';
import CookiesConsent from './components/organisms/cookies/CookieConsent';
import './components/styles/global.css'

const App = () => {

  return (
    <Router>
      <div className="app">
        <CookiesConsent />
        <Navbar />
        <AppRouter />
      </div>
    </Router>
  )

}

export default App
