import React, { useState, useEffect, useRef } from "react";
import profilePic from "/src/assets/profile.png";
import giPic from '/src/assets/gi.png';
import animationData from '/src/assets/animation4.json';
import Lottie from "react-lottie";
import Popup from '../Popup/Popup';
import WebApp from '@twa-dev/sdk';

const Home = () => {
  const [farming, setFarming] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [collectReady, setCollectReady] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const farmingDuration = 1 * 1 * 60 * 1000; // 4 hours in milliseconds
  const cooldownDuration = 1 * 1 * 60 * 1000; // 4-hour cooldown in milliseconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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


  const loadStateFromLocalStorage = () => {
    const savedState = JSON.parse(localStorage.getItem('farmingState'));
    if (savedState) {
      const { farming, collectReady, cooldown, endTime, cooldownEndTime } = savedState;
      const currentTime = Date.now();
      if (farming) {
        const timeRemaining = endTime - currentTime;
        if (timeRemaining > 0) {
          setFarming(true);
          setCollectReady(false);
          setCooldown(false);
          setTimeLeft(timeRemaining);
          setIsPlaying(true); // Start animation
        } else {
          setFarming(false);
          setCollectReady(true);
          setTimeLeft(0);
          setIsPlaying(false); // Stop animation
        }
      } else if (cooldown) {
        const cooldownTimeRemaining = cooldownEndTime - currentTime;
        if (cooldownTimeRemaining > 0) {
          setFarming(false);
          setCollectReady(false);
          setCooldown(true);
          setTimeLeft(cooldownTimeRemaining);
          setIsPlaying(false); // Stop animation
        } else {
          setFarming(false);
          setCollectReady(false);
          setCooldown(false);
          setTimeLeft(0);
        }
      }
    }
  };

  const saveStateToLocalStorage = () => {
    const state = {
      farming,
      collectReady,
      cooldown,
      endTime: farming ? Date.now() + timeLeft : null,
      cooldownEndTime: cooldown ? Date.now() + timeLeft : null
    };
    localStorage.setItem('farmingState', JSON.stringify(state));
  };

  useEffect(() => {
    loadStateFromLocalStorage();
  }, []);

  useEffect(() => {
    saveStateToLocalStorage();
  }, [farming, collectReady, cooldown, timeLeft]);

  useEffect(() => {
    let timer;
    if (farming) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1000;
          if (newTime <= 0) {
            clearInterval(timer);
            setFarming(false);
            setCollectReady(true);
            setIsPlaying(false); // Stop animation
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [farming]);

  useEffect(() => {
    let timer;
    if (cooldown) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1000;
          if (newTime <= 0) {
            clearInterval(timer);
            setCooldown(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const startFarming = () => {
    setFarming(true);
    setCollectReady(false);
    setCooldown(false);
    setTimeLeft(farmingDuration);
    setIsPlaying(true); // Start animation
  };

  const collectFarming = () => {
    setFarming(false);
    setCollectReady(false);
    setCooldown(true);
    setTimeLeft(cooldownDuration);
    setIsPlaying(false); // Stop animation
  };

  const getWaterWidth = () => {
    if (farming) {
      return `${((farmingDuration - timeLeft) / farmingDuration) * 100}%`;
    }
    if (collectReady) {
      return '100%'; // Pipe should be full when ready to collect
    }
    return '0%'; // Pipe is empty otherwise
  };

  const defaultOptions = {
    loop: true,
    autoplay: false,
    isPaused: !isPlaying,
    isClickToPauseDisabled: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    }
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main className="p-4 mb-10 text-yellow">
      {userData ? (
        <>
          <div className="w-full h-full px-4 py-2 bg-white">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 flex-1">
                <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full" />

              </div>
              <div className="flex-1 flex justify-center">
                <img src={giPic} alt="Header" className="w-16 h-16 object-cover rounded-full shadow-md" />
              </div>
              <div className="flex-1 flex justify-end">
                <button onClick={handleOpenPopup} className="bg-navy text-white px-4 py-2 rounded-full transition duration-200">
                  About
                </button>
                <Popup
                  isOpen={isPopupOpen}
                  onClose={handleClosePopup}
                  title="Gaming Intelligence"
                  content="Welcome to Gaming Intelligence, where the future of gaming meets the cutting-edge advancements in artificial intelligence and blockchain technology. Our project is dedicated to revolutionizing the gaming industry by introducing a unique crypto token designed specifically for enhancing artificial intelligence (AI) in gaming."
                />
              </div>
            </div>

            <h1 className="text-l font-bold mb-6">Hello, {userData.username}</h1>

            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">GI Points</h2>
              <p className="text-2xl font-bold text-gray-800">14400</p>
            </div>

            <div className="flex justify-center mb-6 pointer-events-none bg-transparent">
              <Lottie options={defaultOptions} height={250} width={280} isStopped={!isPlaying} />
            </div>

            <div className="w-full mb-6">

              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '50px',
                  border: '2px solid #000',
                  borderRadius: '25px',
                  backgroundColor: '#f0f0f0',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: getWaterWidth(),
                    backgroundColor: '#76c7c0',
                    transition: 'none',
                  }}
                />
                <button
                  onClick={collectReady ? collectFarming : startFarming}
                  disabled={farming || cooldown}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: 'none',
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: farming || cooldown ? 'not-allowed' : 'pointer',
                    textAlign: 'center',
                  }}
                >
                  {farming
                    ? `Farming (${new Date(timeLeft).toISOString().substr(11, 8)})`
                    : collectReady
                      ? 'Collect'
                      : cooldown
                        ? `Cooldown (${new Date(timeLeft).toISOString().substr(11, 8)})`
                        : 'Start Farming'}
                </button>
              </div>

            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
};

export default Home;