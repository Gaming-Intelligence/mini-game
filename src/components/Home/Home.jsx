import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { app } from "../../firebase";
import profilePic from "/src/assets/profile.png";
import giPic from '/src/assets/gi.png';
import animationData from '/src/assets/animation.json';
import Lottie from "react-lottie";

const db = getDatabase(app);

const Home = () => {
  const [count, setCount] = useState(0);
  const [coins, setCoins] = useState(0);
  const [name, setName] = useState("");
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState("Farming");

  const putData = () => {
    const dbRef = ref(db, "users/sourav");
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const previousCoins = snapshot.val().count || 0; // Fetch previous coins
        const newTotalCoins = previousCoins + count; // Add previous coins to new coins
  
        // Update the database with the new total coins
        set(dbRef, {
          id: 1,
          name: name,
          count: newTotalCoins,
        }).then(() => {
          setCoins(newTotalCoins); // Update the coins state
          fetchData(); // Re-fetch the data to ensure the latest value is displayed
        }).catch((error) => {
          console.error("Error updating Firebase:", error);
        });
      }
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  const fetchData = () => {
    const dbRef = ref(db);
    get(child(dbRef, `users/sourav`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCoins(snapshot.val().count);
          setName(snapshot.val().name);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isActive) {
      setIsActive(false);
      setButtonText("Collect");
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const handleButtonClick = () => {
    if (buttonText === "Farming") {
      setTimer(5); // Reset timer to 5 seconds
      setIsActive(true);
      setButtonText(formatTime(5));
      setCount(14400); // Set initial count
    } else if (buttonText === "Collect") {
      putData(); // Call the putData function to send data to Firebase
      setButtonText("Farming"); // Reset button text to "Farming"
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="w-full h-full px-4 py-2">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Profile Section */}
        <div className="flex items-center space-x-2 flex-1">
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-l font-bold">{name}</h1>
        </div>

        {/* Header Photo */}
        <div className="flex-1 flex justify-center">
          <img
            src={giPic}
            alt="Header"
            className="w-16 h-16 object-cover rounded-full shadow-md"
          />
        </div>

        {/* About Button */}
        <div className="flex-1 flex justify-end">
          <button className="bg-navy text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200">
            About
          </button>
        </div>
      </div>

      {/* Coin Section */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">GI Points</h2>
        <p className="text-2xl font-bold text-gray-800">{coins}</p> {/* Display fetched count */}
      </div>

      {/* Lottie Animation Section */}
      <div className="flex justify-center mb-6">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>

      {/* Full-Width Semi-Transparent Button with Timer */}
      <div className="w-full mb-6">
        <button
          onClick={handleButtonClick}
          className="relative w-full bg-blue-500 bg-opacity-80 border-2 border-blue-700 text-white px-8 py-6 rounded-full shadow-lg flex items-center justify-center text-xl font-bold"
        >
          <span className="absolute top-1/2 transform -translate-y-1/2">
            {isActive ? formatTime(timer) : buttonText}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Home;