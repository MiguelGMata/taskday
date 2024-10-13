import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomeScreen from "../pages/home/HomeScreen";
import SignInScreen from "../pages/signIn/SignInScreen";
import SignUpScreen from "../pages/signUp/SignUpScreen";
import ProfileScreen from "../pages/profile/ProfileScreen";
import TaskScreen from "../pages/task/TaskScreen";
import Error from '../pages/error/Error';

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signIn" element={<SignInScreen />} />
            <Route path="/signUp" element={<SignUpScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/task" element={<TaskScreen />} />
            <Route path="/*" element={<Error />} />
        </Routes>
    )
}
export default AppRouter;