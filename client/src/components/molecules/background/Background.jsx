import React, { useState, useEffect } from 'react';
import { saveBackground, fetchBackground } from '../../services/backgroundService';
import './background.css';

const BackgroundChanger = ({ isOpen }) => {
    const [backgroundStyle, setBackgroundStyle] = useState({});
    const [refresh, setRefresh] = useState(false);

    const backgrounds = [
        { type: 'color', value: '#0458d2' },
        { type: 'color', value: '#333' },
        { type: 'color', value: '#fff' },
        { type: 'color', value: '#fa2a71' },
        { type: 'color', value: '#ff6f00ce' },
        { type: 'color', value: '#ffb4d9' },
        { type: 'image', value: 'https://image.lexica.art/full_webp/0722e07a-53f0-4966-8dff-a70051643047' },
        { type: 'image', value: 'https://image.lexica.art/full_webp/7510761f-1e7b-43ef-8838-3c7e40f12510' },
        { type: 'image', value: 'https://image.lexica.art/full_webp/0d0fbd31-7bb1-4a51-9000-5923fad16e9d' },
        { type: 'image', value: 'https://image.lexica.art/full_webp/5762f662-ff45-41f6-abf8-f6e34a252f64' },
        { type: 'image', value: 'https://image.lexica.art/full_webp/4ee7fccc-1ed0-45fd-b1ab-347278c1c039' },
        { type: 'image', value: 'https://image.lexica.art/full_webp/05d57267-20cf-4dc3-acbd-572b4ea7fc36' },
    ];

    useEffect(() => {
        const loadBackground = async () => {
            try {
                const savedBackground = await fetchBackground();
                console.log("Fetched Background:", savedBackground);

                // Si la respuesta parece ser una cadena JSON, parsearla
                const parsedBackground = typeof savedBackground === 'string' ? JSON.parse(savedBackground) : savedBackground;

                console.log("Parsed Background:", parsedBackground);
                console.log("Keys in Parsed Background:", Object.keys(parsedBackground));

                const type = parsedBackground.type;
                const value = parsedBackground.value;
                console.log('type', type);
                console.log('value', value);

                if (type === 'image') {
                    setBackgroundStyle({ backgroundImage: `url(${value})` });
                } else if (type === 'color') {
                    setBackgroundStyle({ backgroundColor: value });
                }
            } catch (error) {
                console.error("Erreur lors du chargement de l'arrière-plan :", error);
            }
        };
        loadBackground();
    }, []);


    const changeBackground = async (background) => {
        // Update the background style
        const newBackgroundStyle = background.type === 'image'
            ? { backgroundImage: `url(${background.value})`, backgroundColor: '' }
            : { backgroundColor: background.value, backgroundImage: '' };

        setBackgroundStyle(newBackgroundStyle);

        // Save the selected background to the database
        try {
            await saveBackground({ type: background.type, value: background.value });
        } catch (error) {
            console.error("Échec de l'enregistrement de l'arrière-plan :", error);
        }
    };
    console.log(backgroundStyle, '<');
    return (
        <div className='background'>
            <div className="background-container" style={backgroundStyle}></div>
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
