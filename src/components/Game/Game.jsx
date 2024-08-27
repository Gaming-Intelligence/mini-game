import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import key from '/src/assets/key.png';
import gameIcon from '/src/assets/game_start.png';

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [score, setScore] = useState(location.state?.score || 0);

    // Initialize keys from localStorage or set to 0 if not present
    const [keys, setKeys] = useState(() => {
        const storedKeys = localStorage.getItem('keys');
        return storedKeys ? parseInt(storedKeys, 10) : 0;
    });

    const [lastKeyAdded, setLastKeyAdded] = useState(() => {
        const storedLastKeyAdded = localStorage.getItem('lastKeyAdded');
        return storedLastKeyAdded ? parseInt(storedLastKeyAdded, 10) : Date.now();
    });

    // Add a key every 6 hours if the user has less than 10 keys
    useEffect(() => {
        const interval = setInterval(() => {
            if (keys < 10) {
                const now = Date.now();
                if (now - lastKeyAdded >= 1 * 1 * 60 * 1000) { // 6 hours in milliseconds
                    setKeys(prevKeys => Math.min(prevKeys + 1, 10));
                    setLastKeyAdded(now);
                    localStorage.setItem('keys', Math.min(keys + 1, 10));
                    localStorage.setItem('lastKeyAdded', now);
                }
            }
        }, 1000); // Check every second

        return () => clearInterval(interval);
    }, [keys, lastKeyAdded]);

    // Start the game and use a key
    const startGame = () => {
        if (keys > 0) {
            setKeys(prevKeys => prevKeys - 1);
            localStorage.setItem('keys', keys - 1);
            navigate('/full-screen-game');
        }
    };

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-xl md:text-3xl font-bold mb-4">Game Page</h1>
            <div className='mb-4 flex justify-center'>
                <button className='bg-navy px-4 py-2 rounded-full text-white flex items-center'> <img src={key} alt="Keyss" className="w-6 h-6 mr-2" /> Keys : {keys}</button>
            </div>
            <div className='mb-4 flex justify-center'>
                <button
                    onClick={startGame}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-full flex items-center transition duration-200 ${keys === 0 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600'}`}
                    disabled={keys === 0}
                >
                    <img src={gameIcon} alt="gameIcon" className="w-6 h-6 mr-2" />
                    Start Game
                </button>
            </div>
            {score > 0 && (
                <div className="score-display pt-4">
                    <h2>Final Score: {score}</h2>
                </div>
            )}
        </div>
    );
};

export default Game;