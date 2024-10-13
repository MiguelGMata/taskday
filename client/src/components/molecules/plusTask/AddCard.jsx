import React, { useState, useEffect } from 'react';
import { createList } from '../../services/listServices';
import { createCard } from '../../services/cardServices';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import Card from '../../atoms/card/Card';
import MessageModal from '../../atoms/modal/MessageModal';
import "./addCard.css"

const AddCard = ({ open, openChange, taskId, listId, idList, reFetchList }) => {

    const [isOpen, setIsOpen] = useState(open);
    const [title, setTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    const handleClose = (newOpen) => {
        setIsOpen(!isOpen);
        openChange(!isOpen);
    }

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (idList) {
                // Crear tarjeta si `idList` está presente
                await createCard(idList, title);
                window.location.reload(); // Refresca la pantalla
            } else if (taskId) {
                // Crear lista si `taskId` está presente
                await createList(taskId, title);
                if (reFetchList) reFetchList();
            } else {
                setShowModal(true);
                setError("Il est nécessaire d'ajouter un titre principal au tableau.");
            }
            setTitle('');
        } catch (error) {
            console.log("Erreur :", error);
        }
    }

    // Usar `useEffect` para depurar si el estado se actualiza correctamente
    useEffect(() => {
        if (showModal) {
            console.log("Modal open.");
        }
    }, [showModal]);

    return (
        <Card className='addcarlist-content'>
            {showModal && <MessageModal message={error} onClose={() => setShowModal(false)} />}
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="title"
                    placeholder="Saisissez un nom..."
                    value={title}
                    onChange={handleInputChange}
                />
                <div className='addcarlist-block'>
                    <Button className="button-card" text="+ Ajouter" />
                    <Button className="button-icon" text="X" onClick={() => handleClose(isOpen)} />
                </div>
            </form>
        </Card>
    );
};

export default AddCard;
