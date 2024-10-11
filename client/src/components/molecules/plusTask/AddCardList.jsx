import React, { useState } from 'react';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import Card from '../../atoms/card/Card';
import "./plusTask.css"

const AddCardList = ({ open, openChange }) => {
    const [isOpen, setIsOpen] = useState(open);

    const handleClose = (newOpen) => {
        setIsOpen(!isOpen);
        openChange(!isOpen);
    }

    return (
        <Card className='addcarlist-content'>
            <Input
                placeholder="Saisissez le nom de la liste..."
            />
            <div className='addcarlist-block'>
                <Button className="botton-card" text="+ Ajouter une liste" />
                <Button text="X" onClick={() => handleClose(isOpen)} />
            </div>
        </Card>
    );
};

export default AddCardList;