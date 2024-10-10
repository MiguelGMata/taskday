import React from 'react';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import Title from '../../atoms/title/Title';
import Label from '../../atoms/label/Label';
import Span from '../../atoms/span/Span';
import Image from '../../atoms/image/Image';
import './form.css';

const FormSignIn = ({ email, setEmail, password, setPassword, handleSubmit, errorMessage }) => {
    return (
        <form className="login-screen" onSubmit={handleSubmit}>
            <Image image="/images/logo.png" width='10%' height='10%' className='image-login' />
            <Title className="title-bi">Démarrer la session pour continuer</Title>
            {errorMessage && <Span className="span-login">{errorMessage}</Span>}
            <div className="form">
                <Label className="label-primary" htmlFor="email" text="Email" />
                <Input
                    type="email"
                    placeholder="Indiquez votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Label className="label-primary" htmlFor="password" text="Mot de passe" />
                <Input
                    type="password"
                    placeholder="Indiquez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="btn-submit">
                    <Button className="btn-login" text="Se connecter" type="submit" />
                </div>
                <div className="line"></div>
            </div>
        </form>
    );
};

export default FormSignIn;
