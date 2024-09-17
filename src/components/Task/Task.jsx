import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import arrowIcon from '/src/assets/up-arrow.png';
import image2 from '/src/assets/metallic_twitter_logo.png';
import image3 from '/src/assets/metallic_telegram_logo.png';
import image4 from '/src/assets/metallic_insta_logo.png';
import tasksIcon from '/src/assets/tasksIcon.png';
import friendsIcon from '/src/assets/friendsIcon.png';
import image5 from '/src/assets/metallic_youtube_logo.png';
import completedIcon from '/src/assets/completedIcon.png';
import WebApp from '@twa-dev/sdk';

const Task = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

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
  useEffect(() => {
    const savedTasks = localStorage.getItem('completedTasks');
    if (savedTasks) {
      setCompletedTasks(JSON.parse(savedTasks)); // Parse and set the tasks from localStorage
    }
  }, []);

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
        const updatedTasks = [...completedTasks, task.taskName];
        setCompletedTasks(updatedTasks);
        localStorage.setItem('completedTasks', JSON.stringify(updatedTasks)); // Save updated tasks to localStorage

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

  return (
    <div className='min-h-screen'>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-yellow">Tasks</h1>
        <div className="space-y-4">
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleTaskClick(e, button)}
              className="flex items-center bg-lightblue bg-navy text-xl py-4 px-6 rounded-lg w-full shadow-lg transition duration-300"
            >
              <img src={button.image} alt={button.text} className="w-12 h-12 mr-4" />
              <span className="flex-grow text-center text-yellow">{button.text}</span>
              <img
                src={completedTasks.includes(button.taskName) ? completedIcon : arrowIcon}
                alt="Task Icon"
                className="w-7 h-7"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Task;