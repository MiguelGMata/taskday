import React, { useState, useEffect } from 'react';
import { getCardsByList, deleteCard, updateCard } from '../../services/cardServices';
import { FaTrashAlt, FaEdit, FaUndoAlt, FaRegTimesCircle } from 'react-icons/fa';
import Input from '../../atoms/input/Input';
import Card from '../../atoms/card/Card';
import Button from '../../atoms/button/Button';
import DragAndDropList from '../../molecules/board/DragAndDropList';
import './addTitleCard.css';

const AddTitleCard = ({ listId, idList }) => {
    const [cards, setCards] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [newTitle, setNewTitle] = useState("");

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
                setIsEditing(null);
                setNewTitle("");
            }
        } catch (error) {
            console.log("Erreur lors de la mise à jour de la carte :", error);
        }
    };

    const fetchCard = async () => {
        try {
            if (idList) {
                const dataCard = await getCardsByList(idList);
                // Ordena las tarjetas antes de establecer el estado
                setCards(dataCard.sort((a, b) => a.order - b.order));
            }
        } catch (error) {
            console.error("Erreur card data :", error);
        }
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const updatedCards = Array.from(cards);
        const [movedCard] = updatedCards.splice(result.source.index, 1);
        updatedCards.splice(result.destination.index, 0, movedCard);

        // Actualiza la propiedad `order` en el arreglo de tarjetas
        const reorderedCards = updatedCards.map((card, index) => ({
            ...card,
            order: index,
        }));

        setCards(reorderedCards);

        // Actualiza el backend con las nuevas posiciones
        try {
            for (const card of reorderedCards) {
                await updateCard({ id: card.id, order: card.order });
            }
        } catch (error) {
            console.log("Erreur lors de la mise à jour de l'ordre des cartes :", error);
        }
    };

    useEffect(() => {
        fetchCard();
    }, [idList]);

    return (
        <DragAndDropList onDragEnd={onDragEnd} className="titlecard-content">
            {cards.map((card, index) => (
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
            ))}
        </DragAndDropList>
    );
};

export default AddTitleCard;
