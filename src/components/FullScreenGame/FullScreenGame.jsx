import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { app } from '../../firebase'; // Adjust the import path as necessary

const db = getDatabase(app);

const FullScreenGame = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleNavigation = (event) => {
            if (event.data.type === 'navigateToGame') {
                const score = event.data.score; // Get the score from the event

                // Fetch the current coins from Firebase
                const dbRef = ref(db, 'users/sourav');
                get(dbRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const previousCoins = snapshot.val().count || 0; // Fetch previous coins
                        const newTotalCoins = previousCoins + score; // Add the score to the coins

                        // Update the database with the new total coins
                        set(dbRef, {
                            id: 1,
                            name: snapshot.val().name,
                            count: newTotalCoins,
                        }).then(() => {
                            console.log('Coins updated successfully');
                        }).catch((error) => {
                            console.error("Error updating Firebase:", error);
                        });
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error("Error fetching data:", error);
                });

                navigate('/game'); // Navigate to the game page
            }
        };

        window.addEventListener('message', handleNavigation);

        return () => {
            window.removeEventListener('message', handleNavigation);
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