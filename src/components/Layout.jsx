import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="App">
            {children}
            {/* Render Navbar only if not on the FullScreenGame page */}
            {location.pathname !== '/full-screen-game' && <Navbar />}
        </div>
    );
};

export default Layout;