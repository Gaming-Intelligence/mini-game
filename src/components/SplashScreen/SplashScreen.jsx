import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/animation2.json';
import './SplashScreen.css'; 
import splashScreen from '../../assets/splashScreen1.jpg';

const SplashScreen = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="splash-screen">
            <img src= {splashScreen} alt="background" className="background-image" />
            <div className="lottie-container">
                <Lottie options={defaultOptions} height={150} width={150} />
            </div>
        </div>
    );
};

export default SplashScreen;