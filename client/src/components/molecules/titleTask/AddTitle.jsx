import React, { useState, useEffect } from 'react';
import { createTask, getTaskById, updateTask } from '../../services/taskServices';
import { FaTrashAlt, FaEdit, FaCheck, FaUndoAlt } from 'react-icons/fa';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import './addTitle.css';

const AddTitle = ({ taskId }) => {
    const [title, setTitle] = useState("");
    const [isEditing, setIsEditing] = useState(false);


    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Si estamos editando, actualizar la tarea
                await updateTask(taskId, { title });
                const task = await getTaskById(taskId);
                setTitle(task.title);
                setIsEditing(true);
            } else {
                // Si estamos creando una nueva tarea
                await createTask({ title });
                setIsEditing(false);
                setTitle('');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        // Si hay un taskId, obtener los datos de la tarea
        const fetchTask = async () => {
            if (taskId) {
                try {
                    const task = await getTaskById(taskId);
                    setTitle(task.title);
                    setIsEditing(true);
                } catch (error) {
                    console.error('Error fetching task:', error);
                }
            }
        };
        fetchTask();
    }, [taskId]);

    return (
        <form className='add-title-content' onSubmit={handleSubmit}>
            <Input
                className="input-title"
                placeholder=""
                value={title}
                onChange={handleInputChange}
            />
            <Button text={isEditing ? <FaUndoAlt /> : <FaCheck />} className="botton-card" />
        </form>
    );
};

export default AddTitle;

