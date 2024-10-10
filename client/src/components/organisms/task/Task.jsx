import React, { useState } from 'react';
import Image from '../../atoms/image/Image';
import Card from '../../atoms/card/Card';
import BackgroundChanger from '../../molecules/background/Background';
import './task.css';



const Task = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section className="section-task">
            <div className="block-task">
                <button className="menu-toggle-btn" onClick={toggleMenu}>
                    {isOpen ? "Fermer" : "Fond d'écran"}
                </button>

            </div>
            <BackgroundChanger isOpen={isOpen} />

        </section>
    )
}
export default Task;