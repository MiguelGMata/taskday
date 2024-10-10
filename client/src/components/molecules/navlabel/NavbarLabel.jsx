import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbarLabel.css';

const NavbarLabel = ({ isOpen, activeItem, onClick }) => {
    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const logout = (
        <div className={`navbar-label ${isOpen ? 'open' : ''}`}>
            <ul className='navbar-label-content'>
                <li className={activeItem === 'home' ? 'active' : ''}
                    onClick={() => onClick('home')} >
                    <Link to="/">Accueil</Link>
                </li>
                <li className={activeItem === 'signUp' ? 'active' : ''} onClick={() => onClick('signUp')}>
                    <Link to="/signUp">Inscription</Link>
                </li>
                <li className={activeItem === 'singIn' ? 'active' : ''} onClick={() => onClick('singIn')}>
                    <Link to="/signIn">Connexion</Link>
                </li>
            </ul>
        </div>
    )

    const login = (
        <div className={`navbar-label ${isOpen ? 'open' : ''}`}>
            <ul className='navbar-label-content'>
                <li className={activeItem === 'home' ? 'active' : ''}
                    onClick={() => onClick('home')} >
                    <Link to="/">Accueil</Link>
                </li>
                <li className={activeItem === 'signUp' ? 'active' : ''} onClick={() => onClick('signUp')}>
                    <Link to="/signUp">Profil</Link>
                </li>
                <li className={activeItem === 'singIn' ? 'active' : ''} onClick={() => onClick('singIn')}>
                    <Link to="/signIn">Tableaux</Link>
                </li>
                <li className={activeItem === 'deconnexion' ? 'active' : ''} onClick={() => handleClick('deconnexion')}>
                    <div onClick={logOut} className="navbar-btn">
                        <a>Déconnexion</a>
                    </div>
                </li>
            </ul>
        </div>
    )
    return (
        <>
            {localStorage.token ? login : logout}
        </>

    );
};

export default NavbarLabel;