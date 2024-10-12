import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileUser } from '../../services/userServices';
import { getTasksByUser, deleteTask } from '../../services/taskServices';
import { FaTrashAlt } from 'react-icons/fa';
import Title from "../../atoms/title/Title";
import Card from "../../atoms/card/Card";
import Label from '../../atoms/label/Label';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import './profile.css';


const Profile = () => {
    const [userProfile, setUserProfile] = useState([]);
    const [taskByUser, setTaskByUser] = useState([]);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            const updatedTasks = taskByUser.filter(task => task.id !== id);
            console.log(updatedTasks, "<")
            setTaskByUser(updatedTasks);
        } catch (error) {
            console.log("Erreur delete: ", error);
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await profileUser();
                setUserProfile(userData);

                const taskData = await getTasksByUser();
                const filtered = taskData.filter((list) => list.userId === userData.id)
                setTaskByUser(filtered)
            } catch (error) {
                console.log('Erreur a charger :', error)
            }
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
                        defaultValue=""

                    />
                    <Label text="Nom" className="label-profile" />
                    <Input
                        type="text"
                        name="lastName"
                        placeholder={userProfile.lastName}
                        defaultValue=""
                    />
                    <Label text="Email" className="label-profile" />
                    <Input
                        type="text"
                        name="email"
                        placeholder={userProfile.email}
                        defaultValue=""
                    />
                </Card>

                <Card className="profile-card">
                    <Title className="title">Vous tableaux</Title>
                    {taskByUser.length > 0 ?
                        taskByUser.map((task) =>
                            <ul key={task.id}>
                                <Card>
                                    <li>{task.title}</li>
                                    <Button className="button-icon" text={<FaTrashAlt onClick={() => handleDelete(task.id)} />} />
                                </Card>
                            </ul>
                        )
                        :
                        <Card>
                            Vous n'avez pas de tableaux ajoutés !
                        </Card>}
                    <Button text="+ Ajouter" className="button-card" onClick={() => navigate('/task')} />
                </Card>
            </div>
        </section>

    );
};

export default Profile;