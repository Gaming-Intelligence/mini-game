import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
// Define the interface for user data


const Authentication = () => {
    const [userData, setUserData] = useState(null);
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

    return (
        <main className="p-4">
            {userData ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">User Data</h1>
                    <ul>
                        <li>ID: {userData.id}</li>
                        <li>First Name: {userData.first_name}</li>
                        <li>Last Name: {userData.last_name || 'N/A'}</li>
                        <li>Username: {userData.username || 'N/A'}</li>
                        <li>Language Code: {userData.language_code}</li>
                        <li>Is Premium: {userData.is_premium ? 'Yes' : 'No'}</li>
                    </ul>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </main>
    );
};

export default Authentication;