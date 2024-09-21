import { useState, useEffect, useContext } from 'react';
import React from 'react';
import Lottie from "react-lottie";
import { useNavigate, useLocation } from 'react-router-dom';
import key from '/src/assets/keys.png';
import gameIcon from '/src/assets/game_start.png';
import { KeyContext } from '../KeyContext'; // Import KeyContext
import animationData from '/src/assets/game_over_animation.json';
import axios from 'axios'; // Import axios for API calls
import WebApp from '@twa-dev/sdk';

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [score, setScore] = useState(location.state?.score || 0);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userData, setUserData] = useState(null);
    const [keys, setKeys] = useState(null);

    useEffect(() => {
        const registerUser = async () => {
            if (WebApp.initDataUnsafe.user) {
                try {
                    const userData = WebApp.initDataUnsafe.user;
                    setUserData(userData);

                    await axios.post('https://game-backend-api.onrender.com/api/user/findUserDetails', {
                        username: userData.username,
                    })
                        .then(response => {
                            console.log('User registered:', response.data.userFound.keys);
                            setKeys(response.data.userFound.keys);
                        })
                        .catch(error => {
                            console.error('There was an error fetching the user!', error.response ? error.response.data.message : error.message);
                        });
                } catch (error) {
                    setError('Failed to load user data');
                }
            }
        };
        registerUser();
    }, []);

    // Improved error handling - Don't hide the whole page on error
    if (error) {
        console.error(error);
    }



    // Start the game and use a key
    const startGame = async () => {
        if (keys > 0) {
            try {
                const response = await axios.post("https://game-backend-api.onrender.com/api/user/decreaseKeys", {
                    username: userData.username,
                });
                setKeys(response.data.keys);
                navigate('/full-screen-game');
            } catch (error) {
                console.error('Error updating keys:', error.response ? error.response.data.message : error.message);
                setError(error.response ? error.response.data.message : error.message);
            }

        }
    };

    // Function to submit the score to the backend
    const submitScore = async () => {
        setIsSubmitting(true); // Set loading state



        try {
            const response = await axios.post('https://game-backend-api.onrender.com/api/user/saveCoins', {
                username: userData.username,
                coins: score,
            });
            console.log('Score saved successfully:', response.data);
            navigate('/');
        } catch (err) {
            setError('Failed to save score');
            console.error('Error saving score:', err.response ? err.response.data.message : err.message);
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        }
    };

    return (
        <div className="p-4 md:p-8 flex flex-col min-h-screen text-yellow">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-yellow mt-14">Game Page</h1>

            <div className="mb-4 flex justify-center">
                <button className="bg-orange px-12 py-3 rounded-full text-navy flex items-center text-l">
                    <img src={key} alt="Keys" className="w-10 h-4 mr-4" />
                    Keys: {keys}
                </button>
            </div>

            <div className="flex-grow">
                {score > 0 && (
                    <div className="score-display pt-4">
                        <h2 className='mb-6'>Final Score: {score}</h2>
                        <Lottie options={defaultOptions} height={200} width={200} />

                        {/* Display submit button after score is shown */}
                        <div className="mt-6">
                            <button
                                onClick={submitScore}
                                className={`bg-green-500 text-green px-8 py-2 rounded-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting} // Disable button when submitting
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Score'}
                            </button>
                        </div>

                        {error && <p className="text-red-500 mt-4">{error}</p>}
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