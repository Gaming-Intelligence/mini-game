import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { app } from "../../firebase";

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [score, setScore] = useState(location.state?.score || 0);
    const [firebaseScore, setFirebaseScore] = useState(0);

    useEffect(() => {
        // Fetch the current score from Firebase
        const fetchScore = async () => {
            try {
                const scoreRef = ref(database, 'scores/user123'); // Update the path to your data
                const snapshot = await get(scoreRef);
                if (snapshot.exists()) {
                    setFirebaseScore(snapshot.val());
                } else {
                    setFirebaseScore(0);
                }
            } catch (error) {
                console.error("Error fetching score:", error);
            }
        };

        fetchScore();
    }, []);

    const updateScore = async () => {
        // Update the score in Firebase
        const newScore = firebaseScore + score;
        try {
            await set(ref(database, 'users/sourav/count'), newScore); // Update the path to your data
            console.log("Score updated successfully");
        } catch (error) {
            console.error("Error updating score:", error);
        }
    };

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
            {score > 0 && (
                <div className="score-display pt-4">
                    <h2>Final Score: {score}</h2>
                    <button
                        onClick={handleFinishGame}
                        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-200 mt-4"
                    >
                        Finish Game
                    </button>
                </div>
            )}
        </div>
    );
};

export default Game;