import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../services/userServices';
import FormSignUp from '../../molecules/form/FormSignUp';
import "./signUp.css";

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            setError(null);
            const response = await signupUser(firstName, lastName, email, password);
            if (response) {
                setSuccessMessage(response.msg);
                setShowModal(true);
                setIsSignupSuccessful(true);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleSignup();
    };

    const closeModal = () => {
        setShowModal(false);
        if (isSignupSuccessful) {
            setTimeout(() => {
                navigate('/signIn');
            }, 500);
        }
    };

    return (
        <div className="signUp-content">
            <FormSignUp
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
                error={error}
                successMessage={successMessage}
                showModal={showModal}
                closeModal={closeModal}
            />


        </div>
    );
};

export default SignUp;
