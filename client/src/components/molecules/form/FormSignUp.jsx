import React from 'react';
import Span from '../../atoms/span/Span';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import Title from '../../atoms/title/Title';
import Label from '../../atoms/label/Label';
import Image from '../../atoms/image/Image';
import MessageModal from '../../atoms/modal/MessageModal';
import './form.css';

const FormSignUp = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    error,
    successMessage,
    showModal,
    closeModal
}) => {
    return (
        <form className="login-screen" onSubmit={handleSubmit}>
            <Image image="/images/logo.png" width='10%' height='10%' className='image-login' />
            <Title className="title-signIn">Inscrivez-vous pour continuer</Title>
            {error && <Span className="span-login">{error}</Span>}
            {showModal && <MessageModal message={successMessage} onClose={closeModal} />}
            <div className="form">
                <Label className="label-primary" htmlFor="firstName" text="Prénom" />
                <Input
                    type="text"
                    placeholder="Indiquez votre prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Label className="label-primary" htmlFor="lastName" text="Nom" />
                <Input
                    type="text"
                    placeholder="Indiquez votre nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                <p>Lors de votre enregistrement, acceptez les conditions du service TaskDay et votre politique de confidentialité.</p>
                <div className="btn-sumit">
                    <Button className="btn-login" text="S'inscrire" type="submit" />
                </div>
                <div className="line"></div>
            </div>
        </form>
    );
};

export default FormSignUp;
