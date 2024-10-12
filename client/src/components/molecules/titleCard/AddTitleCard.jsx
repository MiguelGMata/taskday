import React, { useState, useEffect } from 'react';
import { getCardsByList, deleteCard } from '../../services/cardServices';
import { FaTrashAlt } from 'react-icons/fa';
import Card from '../../atoms/card/Card';
import Title from '../../atoms/title/Title';
import Button from '../../atoms/button/Button';
import PlusTask from '../plusTask/PlusTask';
import './AddTitleCard.css';

const AddTitleCard = ({ listId, cardId, idList }) => {
    const [cards, setCards] = useState([]);

    const handleDelete = async (id) => {
        try {
            await deleteCard(id);
            const updatedCards = cards.filter(card => card.id !== id);
            setCards(updatedCards);
        } catch (error) {
            console.log("Erreur lors de la suppression d'une carte :", error);
        }
    };

    const fetchCard = async () => {
        try {
            if (idList) {
                const dataCards = await getCardsByList(idList);
                setCards(dataCards);
            }
        } catch (error) {
            console.error("Erreur card data :", error);
        }
    };

    useEffect(() => {
        fetchCard();
    }, [listId]);


    return (
        <div className='titlecard-content'>
            {cards.length > 0 ?
                cards.map((card) =>
                    <Card key={card.id} className="titlecard-block">
                        {card.title}
                        <Button className="button-icon" text={<FaTrashAlt />} onClick={() => handleDelete(card.id)} />
                    </Card>
                )
                :
                " "}
        </div>
    );
};

export default AddTitleCard;
