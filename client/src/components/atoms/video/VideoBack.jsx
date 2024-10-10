import React from 'react'; 
import './videoBack.css';

const VideoBack = ({ className=" ", video="https://ik.imagekit.io/logoMGM/videoNotFound.mp4?updatedAt=1727344654451" }) =>{

    return (
        <video className={`video-back ${className}`} autoPlay loop muted>
            <source src={video} type="video/mp4"/>
            Votre navigateur ne prend pas en charge la vidéo HTML5.
        </video>
    );
};
export default VideoBack;