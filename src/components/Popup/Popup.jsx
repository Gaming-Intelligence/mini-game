// src/components/Popup/Popup.jsx
import React from 'react';

const Popup = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-80">
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p className="mb-4">{content}</p>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Popup;