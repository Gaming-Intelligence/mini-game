import React, { useEffect } from 'react';
import splashScreen from '../assets/splashScreen.jpeg'; // Ensure this path is correct

const SplashScreen = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 3000); // Display splash screen for 3 seconds

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${splashScreen})` }}  // Corrected background image syntax
        >
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16"></div> {/* Reduced size of the loader */}
        </div>
    );
};

export default SplashScreen;