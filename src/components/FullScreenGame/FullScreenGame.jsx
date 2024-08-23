import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { app } from '../../firebase'; // Adjust the import path as necessary

const db = getDatabase(app);

const FullScreenGame = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleMessage = (event) => {
            // Ensure the message is from your GitHub Pages domain
            if (event.origin === 'https://gaming-intelligence.github.io') { // Replace with your actual GitHub Pages URL
                if (event.data) {
                    if (event.data.type === 'gameScore') {
                        setScore(event.data.score); // Update the score in your React app
                    } else if (event.data.type === 'gameOver') {
                        navigate('/game'); // Navigate back to the home page when the game is over
                    }
                }
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [navigate]);

    return (
        <div
            className="bg-black"
            style={{ height: '100vh', width: '100vw', margin: '0', padding: '0' }}
        >
            <iframe
                src="https://gaming-intelligence.github.io/game/"
                title="Game"
                className="border-none"
                style={{ width: '100%', height: '100%', margin: '0', padding: '0' }}
            ></iframe>
        </div>
    );
};

export default FullScreenGame;