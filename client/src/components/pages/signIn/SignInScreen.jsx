import React from 'react';
import SignIn from '../../organisms/signIn/SignIn';
import './signInScreen.css'


const SignInScreen = () => {

    return (
        <main className="main-signin">
            <section className="section-signin">
                <SignIn />
            </section>
        </main>
    )
}
export default SignInScreen;