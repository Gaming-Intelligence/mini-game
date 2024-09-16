import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';

const Airdrop = () => {
  const [referralLink, setReferralLink] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [referredUsers, setReferredUsers] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(false); // State to toggle the share options

  // Log state for debugging
  useEffect(() => {
    console.log("userData:", userData);
    console.log("referralLink:", referralLink);
    console.log("referredUsers:", referredUsers);
  }, [userData, referralLink, referredUsers]);

  useEffect(() => {
    const registerUser = async () => {
      if (WebApp.initDataUnsafe.user) {
        try {
          const userData = WebApp.initDataUnsafe.user;
          setUserData(userData);

          await axios.post('https://backend-api-iutr.onrender.com/api/user/findUserDetails', {
            username: userData.username,
          })
            .then(response => {
              console.log('User registered:', response.data.userFound);
              setReferredUsers(response.data.userFound.joinedViaLink);
              setReferralLink(response.data.userFound.refferalCode);
            })
            .catch(error => {
              console.error('There was an error fetching the user!', error.response ? error.response.data.message : error.message);
            });
        } catch (error) {
          setError('Failed to load user data');
        }
      }
    };
    registerUser();
  }, []);

  // Improved error handling - Don't hide the whole page on error
  if (error) {
    console.error(error);
  }

  const handleInviteClick = () => {
    setShowShareOptions(!showShareOptions); // Toggle the share options visibility
  };

  const handleShare = (platform) => {
    const fullLink = `https://t.me/gi_bubble_blaster_bot`;
    const message = `Join using my referral link: ${fullLink}`;
    
    switch (platform) {
      case 'telegram':
        const telegramUrl = `https://t.me/share/url?url=https://t.me/gi_bubble_blaster_bot&text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
        break;
      case 'whatsapp':
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        break;
      // Add more platforms here as needed
      default:
        console.error('Unsupported platform');
    }

    // Hide the share options after sharing
    setShowShareOptions(false);
  };

  const handleCopyLink = () => {
    if (referralLink) {
      // const fullLink = `https://t.me/gi_bubble_blaster_bot`;
      // const message = `Join using my referral link: ${fullLink} and use the referral code: ${referralLink}`;

      navigator.clipboard.writeText(referralLink)
        .then(() => {
          // alert('Referral link and code copied to clipboard!');
        })
        .catch((error) => {
          console.error('Error copying referral link and code:', error);
        });
    } else {
      console.error('No referral link to copy');
    }
  };

  return (
    <div>
      {/* Friends Page Content */}
      <div className="p-4 text-yellow">
        <h1 className="text-2xl font-bold p-4">Invite Friends!</h1>
        <h3 className="text-xl p-8">Invite Friends And Earn More</h3>

        <div className='flex items-center space-x-4 mb-6'>

          {/* Copy Link Button */}
          <button
            className="bg-green-500 text-white flex-grow font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 w-16 h-12 flex justify-center items-center"
            onClick={handleCopyLink}
          >
            Copy Referral Code
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Invite Friends Button */}
          <button
            className="flex-grow bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
            onClick={handleInviteClick}
          >
            Invite Friends
          </button>
          </div>
          

        {/* Share Options Dropdown */}
        {showShareOptions && (
          <div className="bg-white border rounded-lg shadow-lg p-4 mt-4">
            <p className="font-bold">Share via:</p>
            <ul className="space-y-2">
              <li>
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg w-full"
                  onClick={() => handleShare('telegram')}
                >
                  Telegram
                </button>
              </li>
              <li>
                <button
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg w-full"
                  onClick={() => handleShare('whatsapp')}
                >
                  WhatsApp
                </button>
              </li>
              {/* Add more share options here as needed */}
            </ul>
          </div>
        )}

        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Referred Users</h2>

          {referredUsers.length > 0 ? (
            <ul>
              {referredUsers.map((user, index) => (
                <li key={index} className="text-yellow py-2">{user}</li>
              ))}
            </ul>
          ) : (
            <p>No users have joined using your referral link yet.</p>
          )}
        </div>
      </div>

      {error && <div className="text-red-500 mt-4">Error: {error}</div>}
    </div>
  );
};

export default Airdrop;