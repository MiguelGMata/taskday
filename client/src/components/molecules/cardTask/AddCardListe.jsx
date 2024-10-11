import React, { useState } from 'react';
import Card from "../../atoms/card/Card";
import Title from "../../atoms/title/Title";
import "./addCardListe.css"

const AddCard = ({ onAdd }) => {


    return (
        <Card >
            <Title className="title-card">Card</Title>
        </Card>
    );
};

export default AddCard;
