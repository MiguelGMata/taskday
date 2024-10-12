import React, { useState, useEffect } from 'react';
import { createList } from '../../services/listServices';
import { createCard } from '../../services/cardServices';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import Card from '../../atoms/card/Card';
import "./addCard.css"

const AddCard = ({ open, openChange, taskId, listId, idList, reFetchList }) => {

    const [isOpen, setIsOpen] = useState(open);
    const [title, setTitle] = useState([]);

    const handleClose = (newOpen) => {
        setIsOpen(!isOpen);
        openChange(!isOpen);
    }
    const handleInputChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (idList) {
                // Crear tarjeta si `idList` está presente
                await createCard(idList, title);
            } else if (taskId) {
                // Crear lista si `taskId` está presente
                await createList(taskId, title);
                if (reFetchList) reFetchList(); // Refresca las listas después de crear una nueva lista
            }
            setTitle('');
            handleClose();
        } catch (error) {
            console.log("Erreur :", error);
        }
    }


    return (
        <Card className='addcarlist-content'>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="title"
                    placeholder="Saisissez le nom de la liste..."
                    value={title || ""}
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
