import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import key from '/src/assets/key.png';
import gameIcon from '/src/assets/game_start.png';
import { KeyContext } from '../KeyContext'; // Import KeyContext

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [score, setScore] = useState(location.state?.score || 0);

    // Use keys from the global context
    const { keys, setKeys, generateKeys } = useContext(KeyContext);

    // Start the game and use a key
    const startGame = () => {
        if (keys > 0) {
            setKeys(prevKeys => prevKeys - 1);
            localStorage.setItem('keys', keys - 1);
            navigate('/full-screen-game');
        }
    };

    return (
        <div className="p-4 md:p-8 flex flex-col min-h-screen">
            <h1 className="text-xl md:text-3xl font-bold mb-4">Game Page</h1>

            <div className="mb-4 flex justify-center">
                <button className="bg-navy px-4 py-2 rounded-full text-white flex items-center">
                    <img src={key} alt="Keys" className="w-6 h-6 mr-2" />
                    Keys: {keys}
                </button>
            </div>

            <div className="flex-grow">
                {score >= 0 && (
                    <div className="score-display pt-4">
                        <h2>Final Score: {score}</h2>
                    </div>
                )}
            </div>

            <div className="mt-auto flex justify-center mb-20">
                <button
                    onClick={startGame}
                    className={`bg-blue-500 text-white px-12 py-3 rounded-full flex items-center transition duration-200 ${keys === 0 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600'}`}
                    disabled={keys === 0}
                >
                    <img src={gameIcon} alt="gameIcon" className="w-6 h-6 mr-4" />
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default Game;