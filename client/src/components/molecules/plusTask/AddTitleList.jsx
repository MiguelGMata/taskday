import React, { useState, useEffect } from 'react';
import { getListsByTask, deleteList } from '../../services/listServices';
import { FaTrashAlt } from 'react-icons/fa';
import Card from '../../atoms/card/Card';
import Title from '../../atoms/title/Title';
import Button from '../../atoms/button/Button';
import PlusTask from './PlusTask';
import './AddTitleList.css';

const AddTitleList = ({ listId, type = "card" }) => {

    const [lists, setLists] = useState([]);

    const handleDelete = async (id) => {
        try {
            await deleteList(id);
            const updatedLists = lists.filter(list => list.id !== id);
            setLists(updatedLists);
        } catch (error) {
            console.log("Erreur lors de la suppression d'une liste :", error);
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
                        <Card>
                            <div className='titleList-card'>
                                <Title className="title-list">{list.title}</Title>
                                <Button className="button-icon" text={<FaTrashAlt />} onClick={() => handleDelete(list.id)} />
                            </div>
                            <PlusTask listId={listId} reFetchList={fetchList} type={"list"} />
                        </Card>
                        <PlusTask listId={listId} reFetchList={fetchList} />
                    </div>
                )
                :
                <PlusTask listId={listId} reFetchList={fetchList} />
            }
        </div>
    );
};

export default AddTitleList;
