import React, { useState, useEffect } from 'react';
import { profileUser } from '../../services/userServices';
import { getTasksByUser } from '../../services/taskServices';
import { getListsByTask } from '../../services/listServices';
import BackgroundChanger from '../../molecules/background/Background';
import AddTitle from '../../molecules/titleTask/AddTitle';
import PlusTask from '../../molecules/plusTask/PlusTask';
import './task.css';
import AddTitleList from '../../molecules/plusTask/AddTitleList';


const Task = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [listId, setListId] = useState(null);
    const [lists, setLists] = useState([]);
    const [shouldFetchLists, setShouldFetchLists] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    // Primer useEffect para obtener el taskId del usuario
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await profileUser();
                setTaskId(userData.id); // Establecer taskId aquí
            } catch (error) {
                console.error("Erreur profil data :", error);
            }
        };
        fetchProfile();
    }, []);

    // Segundo useEffect para obtener listId basado en taskId
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                if (taskId) {
                    const dataTasksUser = await getTasksByUser();
                    const filteredTasks = dataTasksUser.filter(task => task.userId === taskId);
                    if (filteredTasks.length > 0) {
                        setListId(filteredTasks[0].id); // Establecer listId cuando se tiene un taskId válido
                    }
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [taskId]);


    return (
        <section className="section-task">
            <div className="block-task">
                <button className="menu-toggle-btn" onClick={toggleMenu}>
                    {isOpen ? "Fermer" : "Fond d'écran"}
                </button>
                <AddTitle taskId={taskId} />
            </div>
            <BackgroundChanger isOpen={isOpen} />

            <div className="block-task-liste">
                <AddTitleList listId={listId} />
            </div>
        </section >
    )
}
export default Task;
