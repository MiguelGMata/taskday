import React, { useState, useEffect } from 'react';
import { getListsByTask, deleteList, updateList } from '../../services/listServices';
import { FaTrashAlt, FaEdit, FaUndoAlt, FaRegTimesCircle } from 'react-icons/fa';
import Card from '../../atoms/card/Card';
import Title from '../../atoms/title/Title';
import Button from '../../atoms/button/Button';
import PlusTask from '../plusTask/PlusTask';
import AddTitleCard from '../titleCard/AddTitleCard';
import Input from '../../atoms/input/Input';
import './addTitleList.css';

const AddTitleList = ({ listId, cardId }) => {
    const [lists, setLists] = useState([]);
    const [isEditing, setIsEditing] = useState(null); // Identificador para saber cuál lista se está editando
    const [newTitle, setNewTitle] = useState(""); // Almacena el nuevo título para la edición

    const handleDelete = async (id) => {
        try {
            await deleteList(id);
            const updatedLists = lists.filter(list => list.id !== id);
            setLists(updatedLists);
        } catch (error) {
            console.log("Erreur lors de la suppression d'une liste :", error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            if (newTitle.trim()) {
                await updateList({ id, title: newTitle });
                const updatedLists = lists.map(list =>
                    list.id === id ? { ...list, title: newTitle } : list
                );
                setLists(updatedLists);
                setIsEditing(null); // Deja de editar
                setNewTitle(""); // Limpia el título ingresado
            }
        } catch (error) {
            console.log("erreur de mise à jour de la liste", error);
        }
    };

    const fetchList = async () => {
        try {
            if (listId) {
                const dataLists = await getListsByTask(listId);
                setLists(dataLists);
            }
        } catch (error) {
            console.error("Erreur liste data :", error);
        }
    };

    useEffect(() => {
        fetchList();
    }, [listId]);

    return (
        <div className='titleList-content'>
            {lists.length > 0 ?
                lists.map((list, index) =>
                    <div key={`${list.id}-${index}`} className='titleList-block'>
                        <Card className="cardList">
                            <div className='titleList-card'>
                                {isEditing === list.id ? (
                                    <div className='titleList-input'>
                                        <Input
                                            type="text"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                        />
                                        <Button className="button-icon" text={<FaUndoAlt />} onClick={() => handleUpdate(list.id)} />
                                        <Button className="button-icon" text={<FaRegTimesCircle />} onClick={() => setIsEditing(null)} />
                                    </div>
                                ) : (
                                    <>
                                        <Title className="title-list">{list.title}</Title>
                                        <Button className="button-icon" text={<FaEdit />} onClick={() => {
                                            setIsEditing(list.id);
                                            setNewTitle(list.title);
                                        }} />
                                    </>
                                )}
                                <Button className="button-icon" text={<FaTrashAlt />} onClick={() => handleDelete(list.id)} />
                            </div>
                            <AddTitleCard
                                listId={listId}
                                idList={list.id}
                            />
                            <PlusTask
                                listId={listId}
                                cardId={cardId}
                                idList={list.id}
                                reFetchList={fetchList}
                                type={"list"}
                            />
                        </Card>
                    </div>
                )
                :
                " "
            }
            <PlusTask
                listId={listId}
                reFetchList={fetchList}
            />
        </div>
    );
};

export default AddTitleList;
