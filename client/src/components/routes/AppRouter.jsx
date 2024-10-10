import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomeScreen from "../pages/home/HomeScreen";
import SignInScreen from "../pages/signIn/SignInScreen";
import SignUpScreen from "../pages/signUp/SignUpScreen";
import ProfileScreen from "../pages/profile/ProfileScreen";
import TaskScreen from "../pages/task/TaskScreen";

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signIn" element={<SignInScreen />} />
            <Route path="/signUp" element={<SignUpScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/task" element={<TaskScreen />} />
        </Routes>
    )
}
export default AppRouter;