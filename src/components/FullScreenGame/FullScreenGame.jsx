import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FullScreenGame = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleNavigation = (event) => {
            if (event.data === 'navigateToGame') {
                navigate('/game');
            }
        };

        window.addEventListener('message', handleNavigation);

        return () => {
            window.removeEventListener('message', handleNavigation);
        };
    }, [navigate]);

    return (
        <div 
            className="bg-black " 
            style={{ height: '100vh', width: '100vw', margin: '0', padding: '0' }}
        >
            <iframe
                src="https://gaming-intelligence.github.io/game/"
                title="Game"
                className="border-none"
                style={{ width: '100%', height: '100%', margin: '0', padding: '0', paddingRight: '40' }}    
            ></iframe>
        </div>
    );
};

export default FullScreenGame;