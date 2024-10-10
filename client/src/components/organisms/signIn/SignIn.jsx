import React, { useState } from 'react';
import { signInUser } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import FormSignIn from '../../molecules/form/FormSignIn';
import Image from '../../atoms/image/Image';
import './signIn.css'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await signInUser(email, password);
            if (data) {
                navigate('/profile');
            }
        } catch (error) {
            setErrorMessage(error.response.data.description);
        }
    };

    return (
        <div className="signIn-content">
            <FormSignIn
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleLogin}
                errorMessage={errorMessage}
            />

            <div className="images-signIn">
                <Image image="/images/connexion-1.png" className="image-signIn" />
                <Image image="/images/connexion-2.png" className="image-signIn" />
            </div>

        </div>
    );
};

export default SignIn;