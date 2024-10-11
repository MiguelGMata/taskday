import React, { useState } from 'react';
import Card from '../../atoms/card/Card';
import Title from '../../atoms/title/Title';
import Button from '../../atoms/button/Button'
import "./plusTask.css"
import AddCardList from './AddCardList';

const PlusTask = ({ type = "card" }) => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newState) => {
        setOpen(newState)
    }


    return (
        <div className='plustask-content' >
            {open ?
                (
                    <AddCardList open={open} openChange={handleOpenChange} />
                ) : (
                    <div>
                        {type === "card" ? <Button text="+ Ajouter une liste" onClick={() => setOpen(true)} /> : <Button text="+ Ajoutez une autre liste" onClick={() => setOpen(true)} />}
                    </div>
                )}
        </div>
    );
};

export default PlusTask;