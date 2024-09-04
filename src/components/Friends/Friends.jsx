import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import tasksIcon from '/src/assets/tasksIcon.png';
import friendsIcon from '/src/assets/friendsIcon.png';

const Friends = () => {

  const [userName, setUsername] = useState(null);

  useEffect(() => {
    // Retrieve the username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleInviteClick = async () => {
    try {
      const username = {userName}; // Replace with the actual username
      const response = await axios.post(ROOT_URL+"/findCoins", {
        username
      });
      const inviteLink = response.data.refferalLink;

      // Open Telegram with the invite link
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent('Join me using this link!')}`;
      window.open(telegramUrl, '_blank');
    } catch (error) {
      console.error('Error fetching the invite link:', error);
    }
  };

  return (
    <div>
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

      {/* Friends Page Content */}
      <div className="p-4 text-yellow">
        <h1 className="text-2xl font-bold p-4">Invite Friends!</h1>
        <h3 className="text-xl p-8 ">Invite Friends And Earn More</h3>
        <button
          className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
          onClick={handleInviteClick}
        >
          Invite Friends
        </button>
      </div>
    </div>
  );
}

export default Friends;