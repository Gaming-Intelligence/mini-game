import React, { useState, useEffect } from 'react';
import axios from 'axios';
import arrowIcon from '/src/assets/up-arrow.png';
import image2 from '/src/assets/metallic_twitter_logo.png';
import image3 from '/src/assets/metallic_telegram_logo.png';
import image4 from '/src/assets/metallic_insta_logo.png';
// import tasksIcon from '/src/assets/tasksIcon.png';
// import friendsIcon from '/src/assets/friendsIcon.png';
import image5 from '/src/assets/metallic_youtube_logo.png';
import completedIcon from '/src/assets/completedIcon.png';
import WebApp from '@twa-dev/sdk';

const Task = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [showTab, setShowTab] = useState(false); // State to control half-screen tab
  const [videoLink, setVideoLink] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const [code, setCode] = useState(''); // State to store user input code
  const [taskNames, setTaskNames] = useState([]);
  const [codeSaved, setCodeSaved] = useState(false);

  const buttons = [
    { image: image5, text: 'Youtube  (1000 GIP)', link: 'https://youtube.com/@gamingintelligence_gi', taskName: 'youtube' },
    { image: image2, text: 'Twitter  (1000 GIP)', link: 'https://x.com/GI_Token_', taskName: 'twitter' },
    { image: image3, text: 'Telegram  (1000 GIP)', link: 'https://t.me/Gaming_Intelligence', taskName: 'telegram' },
    { image: image4, text: 'Instagram  (1000 GIP)', link: 'https://www.instagram.com/gaming_intelligence', taskName: 'instagram' },
  ];

  // Save user data if available
  useEffect(() => {
    if (WebApp.initDataUnsafe?.user) {
      try {
        const userData = WebApp.initDataUnsafe.user;
        setUserData(userData); // Set the user data from Telegram
      } catch (err) {
        setError('Failed to load user data');
      }
    } else {
      setError('Telegram user data not found');
    }
  }, []);

  // Load completed tasks from localStorage on component mount
  // useEffect(() => {
  //   const savedTasks = localStorage.getItem('completedTasks');
  //   if (savedTasks) {
  //     setCompletedTasks(JSON.parse(savedTasks)); // Parse and set the tasks from localStorage
  //   }
  // }, []);


  useEffect(() => {
    fetchTaskNames();
  }, []);



  const fetchTaskNames = async () => {
    try {
      const response = await axios.post('https://game-backend-api.onrender.com/api/user/findUserDetails', {
        username: userData.username,
      });
      const taskNames = response.data.userFound.taskName;
      console.log(taskNames);
      setTaskNames(taskNames);
      if (response.data.userFound.lastUsedCode) {
        setCodeSaved(true);
      } else {
        setCodeSaved(false);
      }
    } catch (error) {
      console.error('Error fetching task names:', error);
    }
  };


  const fetchVideoLink = async () => {
    try {
      const response = await axios.get('https://game-backend-api.onrender.com/api/user/getVideoLink'); // Update with your API endpoint
      console.log(response.data.videoDocument.link);
      setVideoLink(response.data.videoDocument.link); // Assuming the API returns { link: 'https://youtube.com/video' }
    } catch (error) {
      console.error('Error fetching video link:', error);
      alert('An error occurred while fetching the video link.');
    }
  };


  const handleTaskClick = async (event, task) => {
    event.preventDefault(); // Prevent the default link behavior

    if (!userData) {
      alert('User data not available');
      return;
    }

    try {
      const response = await axios.post('https://game-backend-api.onrender.com/api/user/saveTask', {
        username: userData.username,
        taskName: task.taskName,
      });

      if (response.status === 200) {
        console.log(`Task ${task.taskName} completed successfully!`);

        // Update the state and localStorage
        setTaskNames([...taskNames, task.taskName]);

        setTimeout(() => {
          window.open(task.link, '_blank'); // Open the link in a new tab
        }, 500);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error completing task:', error);
      alert('An error occurred while completing the task.');
    }
  };

  const handleButtonClick = async () => {
    await fetchVideoLink(); // Fetch video link when opening the tab
    setShowTab(true);
  };

  const handleBackgroundClick = () => {
    setShowTab(false);
    setShowDropdown(false); // Hide dropdown when closing the tab
    setCode(''); // Clear code input
  };


  const handlePlayVideo = () => {
    if (videoLink) {
      window.open(videoLink, '_blank');
      setShowDropdown(true); // Show dropdown for code input
    } else {
      alert('Video link not available');
    }
  };


  const handleCodeSubmit = async () => {
    if (!userData || !code) {
      alert('Please enter a code.');
      return;
    }

    try {
      const response = await axios.post('https://game-backend-api.onrender.com/api/user/verifyYoutubeVideoCode', {
        username: userData.username,
        code: code,
      });

      if (response.status === 200) {
        alert('Code submitted successfully!');
        setShowTab(false); // Close the tab
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting code:', error);
      alert('An error occurred while submitting the code.');
    }
  };



  return (
    <div className='min-h-screen'>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-yellow">Daily Task</h1>

        {/* Separate rectangular button */}
        <button
          onClick={handleButtonClick}
          disabled={codeSaved}
          className={`w-full flex items-center justify-between border-2 border-blue-500 rounded-lg py-4 px-4 font-bold ${codeSaved ? 'bg-navy text-gray-400 opacity-50 cursor-not-allowed' : 'bg-navy text-white opacity-100'
            }`}
        >
          {/* YouTube Icon */}
          <img src={image5} alt="YouTube" className="w-8 h-8 mr-4" />

          {/* Text: "Watch Video" */}
          <span className="flex-grow text-center">Watch Video (1000 GIP)</span>

          {/* Up-arrow Icon */}
          <img src={arrowIcon} alt="Arrow" className="w-5 h-5" />
        </button>

        {/* Fade background and half-screen tab */}
        {showTab && (
          <>
            {/* Background overlay */}
            <div
              className={`fixed inset-0 bg-black z-10 transition-opacity duration-800 ${showTab ? 'opacity-50' : 'opacity-0'
                }`}
              onClick={handleBackgroundClick}
            ></div>

            {/* Half-screen tab */}
            <div
              className={`fixed bottom-0 left-0 w-full h-1/2 bg-white rounded-t-lg shadow-lg p-4 z-20 transition-transform duration-800 ${showTab ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
              <div className="overflow-y-auto h-full">
                {/* YouTube Icon */}
                <div className="flex justify-center mb-2">
                  <img src={image5} alt="YouTube" className="w-12 h-12" />
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-center mb-2">Watch the Video!</h2>

                {/* Description */}
                <p className="text-center text-gray-600 mb-4">
                  Enjoy the latest updates and insights. Click the button below to start watching and enter your secret code!
                </p>

                {/* Play Video Button */}
                <button
                  onClick={handlePlayVideo}
                  className="w-full bg-blue-500 text-white rounded-lg py-2 font-bold mb-2"
                >
                  Play Video
                </button>

                {/* Dropdown section for code input */}
                {showDropdown && (
                  <div className="flex flex-col items-center mt-4">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter your code"
                      className="border border-gray-300 text-black rounded-lg p-2 mb-2 w-4/5"
                    />
                    <button
                      onClick={handleCodeSubmit}
                      className="bg-green text-white rounded-lg py-2 px-4 font-bold"
                    >
                      Submit Code
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <h1 className="text-2xl font-bold mb-6 mt-6 text-yellow">Tasks</h1>

        {/* Task buttons */}
        <div className="space-y-4 mt-4">
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleTaskClick(e, button)}
              className="w-full bg-navy text-white flex items-center justify-between border-2 border-blue-500 rounded-lg py-4 px-4 font-bold"
            >
              <img src={button.image} alt={button.text} className="w-8 h-8 mr-4" />
              <span className="flex-grow text-center text-yellow">{button.text}</span>
              <img
                src={taskNames.includes(button.taskName) ? completedIcon : arrowIcon}
                alt="Task Icon"
                className="w-5 h-5"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;