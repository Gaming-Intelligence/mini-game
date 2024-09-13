import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Airdrop from './components/Airdrop/Airdrop';
import Game from './components/Game/Game';
import Home from './components/Home/Home';
import FullScreenGame from './components/FullScreenGame/FullScreenGame';
import Task from './components/Task/Task';
import Upgrade from './components/Upgrade/Upgrade';
import Layout from './components/Layout';
import Friends from './components/Friends/Friends';
import SplashScreen from './components/SplashScreen/SplashScreen';
import { KeyProvider } from './components/KeyContext';
import RegisterPage from './components/RegisterPage';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';

function App() {
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the duration of the splash screen

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {

    const registerUser = async () => {


      if (WebApp.initDataUnsafe.user) {
        try {
          const userData = WebApp.initDataUnsafe.user;
          setUserData(userData);

          await axios.post('https://backend-api-iutr.onrender.com/api/user/findUser', {
            username: userData.username,
          })
            .then(response => {
              console.log('User registered:', response.data.isRegistered);
              setIsRegistered(response.data.isRegistered);
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

  const handleRegister = (userData) => {
    // Send registration data to the backend
    axios.post('https://backend-api-iutr.onrender.com/api/user/saveUser', userData)
      .then(() => {
        setIsRegistered(true); // Mark user as registered
      })
      .catch(err => {
        console.error('Error during registration:', err);
      });
  };


  return (
    <KeyProvider>
      <Router>
        {loading ? (
          <SplashScreen />
        ) : (
          isRegistered ? (
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/airdrop" element={<Airdrop />} />
                <Route path="/game" element={<Game />} />
                <Route path="/upgrade" element={<Upgrade />} />
                <Route path="/task" element={<Task />} />
                <Route path="/full-screen-game" element={<FullScreenGame />} />
                <Route path="/friends" element={<Friends />} />
              </Routes>
            </Layout>
          ) : (
            <RegisterPage onRegister={handleRegister} />
          )
        )}
      </Router>
    </KeyProvider>
  );
}

export default App;