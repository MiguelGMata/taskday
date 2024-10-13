import React from 'react';
import Image from '../../atoms/image/Image';
import Task from '../../organisms/task/Task';
import './taskScreen.css';


const TaskScreen = () => {

    return (
        <main className="main-task">
            <section className="section-task">
                <Task />
            </section>
        </main>
    )
}
export default TaskScreen;