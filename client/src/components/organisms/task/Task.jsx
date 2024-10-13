import React, { useState, useEffect } from 'react';
import { profileUser } from '../../services/userServices';
import { getTasksByUser } from '../../services/taskServices';
import { getListsByTask } from '../../services/listServices';
import BackgroundChanger from '../../molecules/background/Background';
import AddTitleTask from '../../molecules/titleTask/AddTitleTask';
import AddTitleList from '../../molecules/titleList/AddTitleList';
import Modal from '../../atoms/modal/Modal';
import './task.css';



const Task = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [listId, setListId] = useState(null);
    const [cardId, setCardId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        navigate('/task')
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

    // tercer useEffect para obtener cardId basado en listId
    useEffect(() => {
        const fetchLists = async () => {
            try {
                if (listId) {
                    const dataListTask = await getListsByTask(listId);
                    const filteredList = dataListTask.filter(list => list.taskId === listId);
                    setCardId(filteredList);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchLists();
    }, [listId]);

    return (
        <section className="section-task">
            {showModal &&
                <Modal isOpen={showModal} onClose={closeModal}>
                    <AddTitleTask />
                </Modal>
            }
            <div className="block-task">
                <button className="menu-toggle-btn" onClick={toggleMenu}>
                    {isOpen ? "Fermer" : "Fond d'écran"}
                </button>
                <AddTitleTask taskId={taskId} />
            </div>
            <BackgroundChanger isOpen={isOpen} />

            <div className="block-task-liste">
                <AddTitleList listId={listId} cardId={cardId} />
            </div>
        </section >
    )
}
export default Task;
