import React, { useState, useEffect } from 'react';
import { createTask, getTaskById, updateTask, getTasksByUser } from '../../services/taskServices';
import { FaTrashAlt, FaEdit, FaCheck, FaUndoAlt } from 'react-icons/fa';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import './addTitle.css';

const AddTitleTask = ({ taskId }) => {
    const [title, setTitle] = useState("");
    const [idTask, setIdTask] = useState("");
    const [isEditing, setIsEditing] = useState(false);


    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Si estamos editando, actualizar la tarea
                await updateTask(idTask, { title });
                const task = await getTaskById(idTask);
                setTitle(task.title);
                setIsEditing(true);
            } else {
                // Si estamos creando una nueva tarea
                await createTask({ title });
                const task = await getTaskById(idTask);
                setTitle(task[0].title);
                setIsEditing(false);
            }

        } catch (error) {
            console.error("erreur lors du chargement d'une tâche:", error);
        }
    };

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const dataTasksUser = await getTasksByUser();
                // Filtramos las tareas que pertenecen al `taskId`
                const filteredTasks = dataTasksUser.filter(task => task.userId === taskId);

                // Suponemos que quieres la primera tarea de la lista filtrada
                if (filteredTasks.length > 0) {
                    const task = filteredTasks[0]; // Aquí obtenemos la primera tarea filtrada
                    setIdTask(task.id); // Guardamos el `id` de la tarea
                    setTitle(task.title); // Actualizamos el título con la tarea obtenida
                    setIsEditing(true);
                }
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        if (taskId) {
            fetchTask(); // Llamamos a la función si existe `taskId`
        }
    }, [taskId]);

    return (
        <form className='add-title-content' onSubmit={handleSubmit}>
            <Input
                type="text"
                name="title"
                placeholder={title || "Ajouter un titre"}
                value={title || ""}
                onChange={handleInputChange}
                className="input-title"
            />
            <Button text={isEditing && title ? <FaUndoAlt /> : <FaCheck />} className="button-icon" />
        </form>
    );
};

export default AddTitleTask;

