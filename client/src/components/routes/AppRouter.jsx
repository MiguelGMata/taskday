import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomeScreen from "../pages/home/HomeScreen";
import SignInScreen from "../pages/signIn/SignInScreen";
import SignUpScreen from "../pages/signUp/SignUpScreen";

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signIn" element={<SignInScreen />} />
            <Route path="/signUp" element={<SignUpScreen />} />
        </Routes>
    )
}
export default AppRouter;