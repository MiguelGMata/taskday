import React from 'react';
import SignIn from '../../organisms/signIn/SignIn';
import Image from '../../atoms/image/Image';
import './signInScreen.css';


const SignInScreen = () => {

    return (
        <main className="main-signin">
            <section className="section-signin">
                <SignIn />
            </section>
            <div className="images-signIn">
                <Image image="/images/connexion-1.png" className="image-signIn left-image" />
                <Image image="/images/connexion-2.png" className="image-signIn right-image" />
            </div>
        </main>
    )
}
export default SignInScreen;