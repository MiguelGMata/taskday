import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { profileUser } from '../../services/userServices';
import Title from "../../atoms/title/Title";
import './navbarLabel.css';

const NavbarLabel = ({ isOpen, activeItem, onClick }) => {
    const [userProfile, setUserProfile] = useState([]);
    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem('token');
            setUserProfile([]); // Limpiar el perfil
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const fetchProfile = async () => {
        if (localStorage.getItem('token')) {
            try {
                const response = await profileUser();
                setUserProfile(response);
            } catch (error) {
                console.error("Error al obtener el perfil del usuario:", error);
            }
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [])



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
                <li className={activeItem === 'singIn' ? 'active' : ''} onClick={() => onClick('singIn')}>
                    <Link to="/task">Créer</Link>
                </li>
                <div className={activeItem === 'profile' ? 'active profile-menu' : 'profile-menu'} >
                    <div className="navbar-btn-circle">
                        <Title className="title-secondary">
                            {userProfile.firstName ? userProfile.firstName[0] : ''}{userProfile.lastName ? userProfile.lastName[0] : ''}
                        </Title>
                    </div>
                    <ul className="submenu">
                        <div className='navbar-btn-submenu'>
                            <div className="navbar-btn-circle-B">
                                <Title className="title-secondary">
                                    {userProfile.firstName ? userProfile.firstName[0] : ''}{userProfile.lastName ? userProfile.lastName[0] : ''}
                                </Title>
                            </div>
                            <div>
                                <p> {userProfile.firstName ? userProfile.firstName : ''} {userProfile.lastName ? userProfile.lastName : ''}</p>
                                <p> {userProfile.email ? userProfile.email : ''}</p>
                            </div>
                        </div>
                        <div className="line"></div>
                        <li className={activeItem === 'profile' ? 'active' : ''} onClick={() => onClick('profile')}>
                            <Link to="/profile">Profil</Link>
                        </li>

                        <li className={activeItem === 'task' ? 'active' : ''} onClick={() => onClick('task')}>
                            <Link to="/task">Tableau</Link>
                        </li>

                        <li className='navbar-btn'>
                            <a onClick={logOut} >Déconnexion</a>
                        </li>
                    </ul>
                </div>
            </ul>
        </div>
    );

    return (
        <>
            {localStorage.token ? login : logout}
        </>

    );
};

export default NavbarLabel;