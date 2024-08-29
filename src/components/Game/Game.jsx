import { useState, useContext, useEffect } from 'react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { KeyContext } from '../KeyContext';
import key from '/src/assets/key.png';
import gameIcon from '/src/assets/game_start.png';

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { keys, consumeKey } = useContext(KeyContext);
    const [score, setScore] = useState(location.state?.score || 0);

    const startGame = () => {
        if (keys > 0) {
            consumeKey(); // Synchronously consume a key
            navigate('/full-screen-game');
        }
    };

    // Use useEffect to refresh the page when the score is shown
    useEffect(() => {
        if (score > 0) {
            window.location.reload(); // Refresh the page
        }
    }, [score]);

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-xl md:text-3xl font-bold mb-4">Game Page</h1>
            <div className='mb-4 flex justify-center'>
                <button className='bg-navy px-4 py-2 rounded-full text-white flex items-center'>
                    <img src={key} alt="Keys" className="w-6 h-6 mr-2" /> Keys : {keys}
                </button>
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