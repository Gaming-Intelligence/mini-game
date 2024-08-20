import React from 'react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
    const navigate = useNavigate();

    const startGame = () => {
        navigate('/full-screen-game'); // Navigate to the GameScreen page
    };

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-xl md:text-3xl font-bold mb-4">Game Page</h1>
            <button
                onClick={startGame}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200"
            >
                Start Game
            </button>
        </div>
    );
};

export default Game;