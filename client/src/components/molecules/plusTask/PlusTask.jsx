import React, { useState, useEffect } from 'react';
import Button from '../../atoms/button/Button';
import AddCard from './AddCard';
import "./plusTask.css";

const PlusTask = ({ listId, reFetchList, type }) => {

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
                <AddCard
                    open={open}
                    openChange={handleOpenChange}
                    taskId={listId}
                    reFetchList={handleListAdd}
                />
            ) : (
                <div>
                    {type === "list" ? (
                        <Button text="+ Ajouter une carte" onClick={() => setOpen(true)} />
                    ) : (
                        <Button text="+ Ajoutez une liste" onClick={() => setOpen(true)} />
                    )}
                </div>
            )}
        </div>
    );
};

export default PlusTask;
