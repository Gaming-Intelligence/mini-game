import React, { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk'; // Import Telegram WebApp SDK
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [userData, setUserData] = useState(null); // Initialize userData as null
    const [referrerId, setReferrerId] = useState(''); // Initialize referrerId
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // useNavigate hook for navigation

    useEffect(() => {
        // Check if Telegram user data exists
        if (WebApp.initDataUnsafe?.user) {
            try {
                const userData = WebApp.initDataUnsafe.user;
                setUserData(userData); // Set the user data from Telegram
            } catch (err) {
                setError('Failed to load user data');
            }
        } else {
            setError('Telegram user data not found');
        }
    }, []);


    const handleInputChange = (e) => {
        setReferrerId(e.target.value);
    };


    const handleRegister = async () => {




        try {
            // Send user data to the backend
            const response = await axios.post('https://backend-api-iutr.onrender.com/api/user/saveUser', {
                first_name: userData.first_name,
                username: userData.username,
                is_premium: userData.is_premium ? 'Yes' : 'No',
                referrerId: referrerId || null, // Send referrerId if available, otherwise null
            });
            console.log('User created:', response.data);
            window.location.assign('/');
            // navigate('/');

            // Navigate to the home page after successful registration

        } catch (error) {
            console.error('There was an error creating the user!', error.response ? error.response.data.message : error.message);
        }
    };

    // If there's an error, display the error message
    if (error) {
        return <div>Error: {error}</div>;
    }

    // If userData is still null (loading state), show a loading message
    if (!userData) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="text-yellow font-bold p-4">
            <h1 className='mb-10 text-3xl'>Register Page</h1>

            {/* Only render the user data if it's available */}
            <div className='rounded-lg, shadow-md shadow-mud'>
            {userData && (
                <>
                    <div>
                        <h2 className="text-xl font-bold mb-10">Name: {userData.first_name}</h2>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-10">Username: {userData.username}</h2>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-10">Premium Account: {userData.is_premium ? 'Yes' : 'No'}</h2>
                    </div>
                </>
            )}

            <div>
                <label className='text-xl font-bold mb-10 pr-4'>Referrer Code:</label>
                </div>
                <div>
                <input
                    className='text-xl font-bold mb-10 p-3 rounded-lg'
                    type="text"
                    placeholder="  Enter the referral code"
                    onChange={handleInputChange} // Update referrerCode state when changed
                />
            </div>
            <button
                className="flex-grow bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
                onClick={handleRegister}>
                Register
            </button>
        </div>
        </div>
    );
};

export default RegisterPage;