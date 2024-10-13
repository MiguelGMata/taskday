import React, { useState, useEffect } from 'react';
import { getCardsByList, deleteCard, updateCard } from '../../services/cardServices';
import { FaTrashAlt, FaEdit, FaUndoAlt, FaRegTimesCircle } from 'react-icons/fa';
import Input from '../../atoms/input/Input';
import Card from '../../atoms/card/Card';
import Button from '../../atoms/button/Button';
import './AddTitleCard.css';

const AddTitleCard = ({ listId, idList }) => {
    const [cards, setCards] = useState([]);
    const [isEditing, setIsEditing] = useState(null); // Identifica cuál tarjeta está en edición
    const [newTitle, setNewTitle] = useState(""); // Almacena el nuevo título para la edición

    const handleDelete = async (id) => {
        try {
            await deleteCard(id);
            const updatedCards = cards.filter(card => card.id !== id);
            setCards(updatedCards);
        } catch (error) {
            console.log("Erreur lors de la suppression d'une carte :", error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            if (newTitle.trim()) {
                await updateCard({ id, title: newTitle });
                const updatedCards = cards.map(card =>
                    card.id === id ? { ...card, title: newTitle } : card
                );
                setCards(updatedCards);
                setIsEditing(null); // Salir del modo de edición
                setNewTitle(""); // Limpiar el nuevo título
            }
        } catch (error) {
            console.log("Erreur lors de la mise à jour de la carte :", error);
        }
    };

    const fetchCard = async () => {
        try {
            if (idList) {
                const dataCard = await getCardsByList(idList);
                setCards(dataCard);
            }
        } catch (error) {
            console.error("Erreur card data :", error);
        }
    };

    useEffect(() => {
        fetchCard();
    }, [idList]);

    return (
        <div className='titlecard-content'>
            {cards.length > 0 ?
                cards.map((card) =>
                    <Card key={card.id} className="titlecard-block">
                        {isEditing === card.id ? (
                            <div className='titleList-input'>
                                <Input
                                    type="text"
                                    value={newTitle}
                                    className="input-card"
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                                <Button className="button-icon" text={<FaUndoAlt />} onClick={() => handleUpdate(card.id)} />
                                <Button className="button-icon" text={<FaRegTimesCircle />} onClick={() => setIsEditing(null)} />
                            </div>
                        ) : (
                            <div className='titleList-edit'>
                                {card.title}
                                <Button className="button-icon" text={<FaEdit />} onClick={() => {
                                    setIsEditing(card.id);
                                    setNewTitle(card.title);
                                }} />
                            </div>
                        )}
                        <Button className="button-icon" text={<FaTrashAlt />} onClick={() => handleDelete(card.id)} />
                    </Card>
                )
                :
                "Aucune carte affichée"}
        </div>
    );
};

export default AddTitleCard;


