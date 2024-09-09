import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import tasksIcon from '/src/assets/tasksIcon.png';
import friendsIcon from '/src/assets/friendsIcon.png';
import axios from 'axios';

const Friends = () => {

  const [referralLink, setReferralLink] = useState('');
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

  const handleInviteClick = async () => {

    try {
      const response = await axios.post('https://backend-api-iutr.onrender.com/api/user/saveCoins', {
        username: userData.username,
        coins: 0,
      });

      console.log(response.data.userFound)

      setReferralLink(response.data.userFound.refferalLink);
    } catch (error) {
      console.error('Error fetching referral link:', error.response ? error.response.data.message : error.message);
    }

    console.log(referralLink);

    if (referralLink) {

      const message = encodeURIComponent(`Hey! Use my referral link to join: ${referralLink}`);
      const telegramUrl = `https://t.me/share/url?url=${referralLink}&text=${message}`;


      window.open(telegramUrl, '_blank');
    } else {
      console.error('No referral link found');
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
        <button className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300" onClick={handleInviteClick}>
          Invite Friends
        </button>
      </div>
    </div>
  );
}

export default Friends;