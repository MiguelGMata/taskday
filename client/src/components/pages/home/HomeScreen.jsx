import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../atoms/title/Title';
import Button from '../../atoms/button/Button';
import Image from '../../atoms/image/Image';
import './homeScreen.css';

const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <main className='main-homescreen'>
            <section className="section-homescreen">
                <div className='block-homescreen'>
                    <Title className="title-primary">TaskDay rassemble vos tâches</Title>
                    <p>Centralisez tout votre contenu en un seul endroit</p>
                    {(localStorage.getItem('token')) ?
                        <Button text="Accéder au tableau !" onClick={() => navigate('/task')} />
                        :
                        <Button text="Inscrivez-vous, c'est gratuit !" onClick={() => navigate('/signUp')} />
                    }
                </div>
                <div className='block-homescreen'>
                    <Image image='./images/Trell0.webp' className='image-home' />
                </div>
            </section>
            <div className="block-homescreen-svg">
                <p className="title-homescreen">Collaborez efficacement, suivez l'avancement de chaque mission et organisez vos priorités en temps réel. Avec TaskDay, boostez votre productivité et travaillez en toute sérénité.</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 320" className='svg'>
                    <path fill="#f3f4f5" fillOpacity="1" d="M0,96L48,101.3C96,107,192,117,288,106.7C384,96,480,64,576,64C672,64,768,96,864,112C960,128,1056,128,1152,122.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </main>
    )
}
export default HomeScreen;
