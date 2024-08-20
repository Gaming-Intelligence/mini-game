import React from "react";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../firebase";
import { useState } from "react";
import profilePic from "/src/assets/profile.png";
import giPic from '/src/assets/gi.png';
import animationData from '/src/assets/animation.json';
import Lottie from "react-lottie";

const db = getDatabase(app);

const Home = () => {
  const [count, setCount] = useState(0);

  const putData = () => {
    set(ref(db, "users/sourav"), {
      id: 1,
      name: "Sourav",
      count: count,
    });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  return (
    <div className="w-full h-full px-4 py-2">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Profile Section */}
        <div className="flex items-center space-x-2 flex-1 ">
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-l font-bold">Sourav</h1>
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

      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Total Coins</h2>
        <p className="text-2xl font-bold text-gray-800">99999</p>
      </div>

      {/* Lottie Animation Section */}
      <div className="flex justify-center mb-6">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center space-x-6">
        <button
          className="h-10 px-6 font-semibold rounded-md bg-black text-white"
          type="button"
          onClick={() => setCount(count + 1)}
        >
          Count {count}
        </button>
        <button
          className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
          type="button"
          onClick={putData}
        >
          Put Data
        </button>
      </div>
    </div>
  );
};

export default Home;
