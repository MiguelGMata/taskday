import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'; ``
import AppRouter from './components/routes/AppRouter';
import Navbar from './components/organisms/navbar/Navbar';
import './components/styles/global.css'

const App = () => {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <AppRouter />
      </div>
    </Router>
  )

}

export default App
