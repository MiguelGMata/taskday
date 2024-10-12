import React, { useState, useEffect } from 'react';
import { createList, getListById, updateList, deleteList } from '../../services/listServices';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import Card from '../../atoms/card/Card';
import "./plusTask.css"

const AddCardList = ({ open, openChange, taskId, reFetchList }) => {
    const [isOpen, setIsOpen] = useState(open);
    const [title, setTitle] = useState([]);

    console.log(taskId)
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
            await createList(taskId, title);
            reFetchList();
            setTitle('');

        } catch (error) {
            console.log("erreur :" + error);
        }
    }


    return (
        <div className='addcarlist-content'>
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
        </div>
    );
};

export default AddCardList;