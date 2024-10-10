import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { profileUser } from '../../services/userServices';
import Title from "../../atoms/title/Title";
import Card from "../../atoms/card/Card";
import Label from '../../atoms/label/Label';
import Input from '../../atoms/input/Input';
import './profile.css';

const Profile = () => {
    const [userProfile, setUserProfile] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await profileUser();
            setUserProfile(response);
        }
        fetchProfile();
    }, [])


    return (
        <section className="profile-content">
            <div className="profile-block">
                <Card>
                    <div className="profile-btn-circle">
                        <Title className="title-secondary">
                            {userProfile.firstName ? userProfile.firstName[0] : ''}{userProfile.lastName ? userProfile.lastName[0] : ''}
                        </Title>
                    </div>
                    <Title className="title-bi">
                        {userProfile.firstName ? userProfile.firstName : ''} {userProfile.lastName ? userProfile.lastName : ''}
                    </Title>
                </Card>
            </div>
            <div className="line profile-block"></div>
            <div className="profile-block">
                <Card >
                    <Title className="title">À propos de vous</Title>
                    <Label text="Prenom" className="label-profile" />
                    <Input
                        type="text"
                        name="firstName"
                        placeholder={userProfile.firstName}
                        value=""
                        onChange=""
                        checked=""
                    />
                    <Label text="Nom" className="label-profile" />
                    <Input
                        type="text"
                        name="lastName"
                        placeholder={userProfile.lastName}
                        value=""
                        onChange=""
                        checked=""
                    />
                    <Label text="Email" className="label-profile" />
                    <Input
                        type="text"
                        name="email"
                        placeholder={userProfile.email}
                        value=""
                        onChange=""
                        checked=""
                    />
                </Card>

                <Card className="profile-card">
                    <Title className="title">Vous tableaux</Title>

                    <Card>Vous n'avez pas de tableaux ajoutés !</Card>

                </Card>
            </div>
        </section>

    );
};

export default Profile;