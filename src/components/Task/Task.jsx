import React from 'react';
import { NavLink } from 'react-router-dom';
import arrowIcon from '/src/assets/arrow-right.png';
import image1 from '/src/assets/facebook.png'; // Replace with your actual image paths
import image2 from '/src/assets/twitter.png';
import image3 from '/src/assets/telegram.png';
import image4 from '/src/assets/instagram.png';
import tasksIcon from '/src/assets/tasksIcon.png';
import friendsIcon from '/src/assets/friendsIcon.png';

const Task = () => {
  const buttons = [
    { image: image1, text: 'Facebook', link: 'https://www.facebook.com' },
    { image: image2, text: 'Twitter', link: 'https://www.twitter.com' },
    { image: image3, text: 'Telegram', link: 'https://web.telegram.org/k/' },
    { image: image4, text: 'Instagram', link: 'https://www.instagram.com/' },
    // Add more buttons as needed
  ];

  return (
    <div className='bg-white min-h-screen'>
      {/* Top Navbar */}
      <nav className="bg-white p-4 flex space-x-4 justify-center">
        <NavLink
          to="/task"
          className={({ isActive }) =>
            isActive
              ? "text-navy font-bold bg-lightblue py-2 px-4 rounded flex items-center space-x-2"
              : "text-gray-500 font-bold py-2 px-4 rounded flex items-center space-x-2"
          }
        >
          <img src={tasksIcon} alt="Tasks Icon" className="w-6 h-6" />
          <span>Tasks</span>
        </NavLink>
        <NavLink
          to="/friends"
          className={({ isActive }) =>
            isActive
              ? "text-navy font-bold bg-lightblue py-2 px-4 rounded flex items-center space-x-2"
              : "text-gray-500 font-bold py-2 px-4 rounded flex items-center space-x-2"
          }
        >
          <img src={friendsIcon} alt="Friends Icon" className="w-6 h-6" />
          <span>Friends</span>
        </NavLink>
      </nav>

      {/* Task Page Content */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <div className="space-y-4">
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-lightblue bg-ivory text-navy font-bold py-4 px-6 rounded-lg w-full shadow-lg transition duration-300"
            >
              <img src={button.image} alt={button.text} className="w-12 h-12 mr-4" />
              <span className="flex-grow text-center">{button.text}</span>
              <img src={arrowIcon} alt="Arrow Icon" className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Task;