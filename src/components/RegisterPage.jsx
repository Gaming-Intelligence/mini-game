import React, { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

const RegisterPage = ({ onRegister }) => {
    const [userData, setUserData] = useState({
        first_name: '',
        username: '',
        is_premium: '',
        referrerId: ''
    });

    useEffect(() => {

        const registerUser = async () => {


            if (WebApp.initDataUnsafe.user) {
                try {
                    const telegramData = WebApp.initDataUnsafe.user;

                    setUserData({
                        first_name: telegramData.first_name,
                        username: telegramData.username,
                        is_premium: telegramData.is_premium ? 'Yes' : 'No',
                        referrerId: ''
                    });

                } catch (error) {
                    setError('Failed to load user data');
                }
            }
        };
        registerUser();
    }, []);

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        // Use default referrer code if none is provided
        const dataToSend = {
            ...userData,
            referrerId: userData.referrerId || 'DEFAULT_REFERRER'
        };

        onRegister(dataToSend); // Call the registration handler passed from the parent component (App)
    };

    return (
        <div className='text-yellow'>
            <h2>Register Page</h2>
            <div>
                <label>First Name:</label>
                <input type="text" value={userData.first_name} readOnly />
            </div>
            <div>
                <label>Username:</label>
                <input type="text" value={userData.username} readOnly />
            </div>
            <div>
                <label>Is Premium:</label>
                <input type="text" value={userData.is_premium} readOnly />
            </div>
            <div>
                <label>Referrer Code:</label>
                <input
                    type="text"
                    name="referrerCode"
                    value={userData.referrerId}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterPage;