import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../atoms/image/Image';
import BurgerIcon from '../../atoms/burger/BurgerIcon';
import NavbarLabel from '../../molecules/navlabel/NavbarLabel';
import './navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);


    const openClickMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleActiveItem = (item) => {
        setActiveItem(item);
        setMenuOpen(false);
    };

    return (
        <nav className="navbar-content">
            <Link to="/" className="navbar-logo">
                <Image image="./images/logo-taskday.jpeg" width='50px' height='50px' className='image-logo' />
            </Link>
            <BurgerIcon
                isOpen={menuOpen}
                onClick={openClickMenu}
            />
            <NavbarLabel
                isOpen={menuOpen}
                activeItem={activeItem}
                onClick={handleActiveItem}
            />
        </nav>
    );
};

export default Navbar;