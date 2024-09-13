import React, { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = ({ onRegister }) => {
    const [userData, setUserData] = useState(null);
    const [referrerId, setReferrerId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (WebApp.initDataUnsafe.user) {
            try {
                const userData = WebApp.initDataUnsafe.user;
                setUserData(userData);
            } catch (error) {
                setError('Failed to load user data');
            }
        }
    }, [WebApp.initDataUnsafe.user]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleInputChange = (e) => {
        setReferrerId(e.target.value); // Update the referrerCode state
    };


    const handleRegister = async () => {
        axios.post('https://backend-api-iutr.onrender.com/api/user/saveUser', {
            first_name: userData.first_name,
            username: userData.username,
            is_premium: userData.is_premium ? 'Yes' : 'No',
            referrerId: referrerId || null
          })
            .then(response => {
              console.log('User created:', response.data);
              Navigate('/');
            })
            .catch(error => {
              console.error('There was an error creating the user!', error.response ? error.response.data.message : error.message);
            });
      };

    

    return (
        <div className='text-yellow'>
            <h1>Register Page</h1>
            <div>
                <h2 className="text-l font-bold mb-6">Name, {userData.first_name}</h2>
            </div>
            <div>
                <h2 className="text-l font-bold mb-6">Username, {userData.username}</h2>
            </div>
            <div>
                <h2 className="text-l font-bold mb-6">Premium Account, {userData.is_premium}</h2>
            </div>
            <div>
                <label>Referrer Code:</label>
                <input
                    type="text"
                    placeholder='Enter the code'
                    onChange={handleInputChange} // Update referrerCode state when changed
                />
            </div>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterPage;