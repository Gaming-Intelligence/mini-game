import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create the context
export const KeyContext = createContext();

// Context provider component
export const KeyProvider = ({ children }) => {
    const [keys, setKeys] = useState(() => {
        const storedKeys = localStorage.getItem('keys');
        return storedKeys ? parseInt(storedKeys, 10) : 3;
    });

    const [lastKeyAdded, setLastKeyAdded] = useState(() => {
        const storedLastKeyAdded = localStorage.getItem('lastKeyAdded');
        return storedLastKeyAdded ? parseInt(storedLastKeyAdded, 10) : Date.now();
    });

    const generateKeys = useCallback(() => {
        const now = Date.now();
        const hoursElapsed = Math.floor((now - lastKeyAdded) / (6 * 60 * 60 * 1000)); // 6 hours in milliseconds

        if (hoursElapsed > 0 && keys < 10) {
            const newKeys = Math.min(keys + hoursElapsed, 10); // Add keys based on elapsed hours
            const newLastKeyAdded = lastKeyAdded + hoursElapsed * 6 * 60 * 60 * 1000;

            setKeys(newKeys);
            setLastKeyAdded(newLastKeyAdded);
            localStorage.setItem('keys', newKeys);
            localStorage.setItem('lastKeyAdded', newLastKeyAdded);
        }

        // Continue generating keys every 6 hours
        const interval = setInterval(() => {
            const currentNow = Date.now();
            if (keys < 10) {
                if (currentNow - lastKeyAdded >= 6 * 60 * 60 * 1000) {
                    setKeys(prevKeys => Math.min(prevKeys + 1, 10));
                    setLastKeyAdded(currentNow);
                    localStorage.setItem('keys', Math.min(keys + 1, 10));
                    localStorage.setItem('lastKeyAdded', currentNow);
                }
            }
        }, 1000); // Check every second

        return () => clearInterval(interval);
    }, [keys, lastKeyAdded]);

    useEffect(() => {
        generateKeys();
    }, [generateKeys]);

    return (
        <KeyContext.Provider value={{ keys, setKeys }}>
            {children}
        </KeyContext.Provider>
    );
};