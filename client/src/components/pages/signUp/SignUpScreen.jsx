import React from 'react';
import SignUp from '../../organisms/signUp/SignUp';
import Image from '../../atoms/image/Image';
import './signUpScreen.css';

const SignUpScreen = () => {

    return (
        <main className="main-signup">
            <section className="section-signup">
                <SignUp />

            </section>
            <div className="images-signUp">
                <Image image="/images/connexion-1.png" className="image-signIn left-image" />
                <Image image="/images/connexion-2.png" className="image-signIn right-image" />
            </div>
        </main>
    )
}
export default SignUpScreen;