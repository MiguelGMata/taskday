import React, { useState, useEffect } from 'react';
import Button from '../../atoms/button/Button';
import AddCardList from './AddCardList';
import "./plusTask.css";

const PlusTask = ({ listId, reFetchList, type = "card" }) => {
    const [open, setOpen] = useState(false);
    const handleOpenChange = (newState) => {
        setOpen(newState)
    }
    const handleListAdd = () => {
        setOpen(false);
        if (reFetchList) {
            reFetchList();
        }
    }
    return (
        <div className='plustask-content'>
            {open ? (
                <AddCardList
                    open={open}
                    openChange={handleOpenChange}
                    taskId={listId}
                    reFetchList={handleListAdd}
                />
            ) : (
                <div>
                    {type === "card" ? (
                        <Button text="+ Ajouter une liste" onClick={() => setOpen(true)} />
                    ) : (
                        <Button text="+ Ajoutez une autre liste" onClick={() => setOpen(true)} />
                    )}
                </div>
            )}
        </div>
    );
};

export default PlusTask;
