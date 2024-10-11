import React, { useState, useEffect } from 'react';
import { profileUser } from '../../services/userServices';
import BackgroundChanger from '../../molecules/background/Background';
import AddTitle from '../../molecules/titleTask/AddTitle';
import PlusTask from '../../molecules/plusTask/PlusTask.';
import './task.css';


const Task = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userProfile, setUserProfile] = useState([]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await profileUser();
            setUserProfile(response);
        }
        fetchProfile();
    }, [])


    return (
        <section className="section-task">
            <div className="block-task">
                <button className="menu-toggle-btn" onClick={toggleMenu}>
                    {isOpen ? "Fermer" : "Fond d'écran"}
                </button>
                <AddTitle taskId={userProfile.id} />
            </div>
            <BackgroundChanger isOpen={isOpen} />

            <div className="block-task-liste">
                <PlusTask />
            </div>
        </section >
    )
}
export default Task;
