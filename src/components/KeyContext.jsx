import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create the context
export const KeyContext = createContext();

// Context provider component
export const KeyProvider = ({ children }) => {
    const [keys, setKeys] = useState(() => {
        const storedKeys = localStorage.getItem('keys');
        return storedKeys ? parseInt(storedKeys, 10) : 0;
    });

    const [lastKeyAdded, setLastKeyAdded] = useState(() => {
        const storedLastKeyAdded = localStorage.getItem('lastKeyAdded');
        return storedLastKeyAdded ? parseInt(storedLastKeyAdded, 10) : Date.now();
    });

    const updateKeysInLocalStorage = (newKeys, newLastKeyAdded) => {
        localStorage.setItem('keys', newKeys);
        localStorage.setItem('lastKeyAdded', newLastKeyAdded);
    };

    const generateKeys = useCallback(() => {
        const now = Date.now();
        const hoursElapsed = Math.floor((now - lastKeyAdded) / (1 * 1 * 60 * 1000)); // 6 hours in milliseconds

        if (hoursElapsed > 0 && keys < 10) {
            const newKeys = Math.min(keys + hoursElapsed, 10); // Calculate the potential new key count
            const newLastKeyAdded = lastKeyAdded + hoursElapsed * 1 * 1 * 60 * 1000;

            setKeys(newKeys);
            setLastKeyAdded(newLastKeyAdded);
            updateKeysInLocalStorage(newKeys, newLastKeyAdded);
        }

        // Continue generating keys every 6 hours
        const interval = setInterval(() => {
            const currentNow = Date.now();
            if (keys < 10) {
                if (currentNow - lastKeyAdded >= 1 * 1 * 60 * 1000) {
                    const additionalKeys = 1;
                    const newKeyCount = Math.min(keys + additionalKeys, 10);
                    setKeys(newKeyCount);
                    setLastKeyAdded(currentNow);
                    updateKeysInLocalStorage(newKeyCount, currentNow);
                }
            }
        }, 1000); // Check every second

        return () => clearInterval(interval);
    }, [keys, lastKeyAdded]);

    useEffect(() => {
        generateKeys();
    }, [generateKeys]);

    const consumeKey = () => {
        if (keys > 0) {
            const newKeyCount = keys - 1;
            setKeys(newKeyCount);
            updateKeysInLocalStorage(newKeyCount, lastKeyAdded);
        }
    };

    return (
        <KeyContext.Provider value={{ keys, setKeys, consumeKey }}>
            {children}
        </KeyContext.Provider>
    );
};