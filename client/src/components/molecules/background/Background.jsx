import React, { useState } from 'react';
import './Background.css';

const BackgroundChanger = ({ isOpen }) => {
    const [backgroundStyle, setBackgroundStyle] = useState({ backgroundImage: 'url(https://via.placeholder.com/800)' }); // Estilo inicial con imagen

    const backgrounds = [
        { type: 'image', value: 'https://via.placeholder.com/800' },
        { type: 'image', value: 'https://via.placeholder.com/700' },
        { type: 'image', value: 'https://via.placeholder.com/800' },
        { type: 'image', value: 'https://via.placeholder.com/700' },
        { type: 'image', value: 'https://via.placeholder.com/800' },
        { type: 'image', value: 'https://via.placeholder.com/700' },
        { type: 'color', value: '#3498db' },
        { type: 'color', value: '#e74c3c' },
        { type: 'color', value: '#2ecc71' },
        { type: 'color', value: '#3498db' },
        { type: 'color', value: '#e74c3c' },
        { type: 'color', value: '#2ecc71' }
    ];

    const changeBackground = (background) => {
        if (background.type === 'image') {
            setBackgroundStyle({ backgroundImage: `url(${background.value})`, backgroundColor: '' });
        } else {
            setBackgroundStyle({ backgroundColor: background.value, backgroundImage: '' });
        }
    };

    return (
        <div className="background-container" style={backgroundStyle}>

            <div className={`background-options ${isOpen ? 'open' : ''}`}>
                {backgrounds.map((background, index) => (
                    <button
                        key={index}
                        className="background-btn"
                        onClick={() => changeBackground(background)}
                        style={background.type === 'image' ? { backgroundImage: `url(${background.value})` } : { backgroundColor: background.value }}
                    >
                        {background.type === 'image' ? `Image ${index + 1}` : `Couleur ${index + 1}`}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BackgroundChanger;

