import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../Home/Home';
import Airdrop from '../Airdrop/Airdrop';
import Game from '../Game/Game';
import Task from '../Task/Task';
import homeIcon from '/src/assets/homeIcon.png';
import airdropIcon from '/src/assets/airdropIcon.png';
import gameIcon from '/src/assets/gameIcon.png';
import taskIcon from '/src/assets/taskIcon.png';
import upgradeIcon from '/src/assets/upgradeIcon.png';
import Upgrade from '../Upgrade/Upgrade';

const Navbar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-navy text-white flex justify-around items-center p-2 md:p-4 shadow-lg rounded-t-lg">
      <Link
        to="/"
        className="flex flex-col items-center transition-transform duration-200 ease-in-out text-sm md:text-base px-4 py-2"
      >
        <img src={homeIcon} alt="Home" className="h-6 w-6 mb-1" />
        Home
      </Link>
      <Link
        to="/airdrop"
        className="flex flex-col items-center transition-transform duration-200 ease-in-out text-sm md:text-base px-4 py-2"
      >
        <img src={airdropIcon} alt="Airdrop" className="h-6 w-6 mb-1" />
        Airdrop
      </Link>
      <Link
        to="/game"
        className="flex flex-col items-center transition-transform duration-200 ease-in-out text-sm md:text-base px-4 py-2"
      >
        <img src={gameIcon} alt="Game" className="h-6 w-6 mb-1" />
        Game
      </Link>
      <Link
        to="/upgrade"
        className="flex flex-col items-center transition-transform duration-200 ease-in-out text-sm md:text-base px-4 py-2"
      >
        <img src={upgradeIcon} alt="Upgrade" className="h-6 w-6 mb-1" />
        Upgrade
      </Link>
      <Link
        to="/task"
        className="flex flex-col items-center transition-transform duration-200 ease-in-out text-sm md:text-base px-4 py-2"
      >
        <img src={taskIcon} alt="Task" className="h-6 w-6 mb-1" />
        Task
      </Link>
    </div>
  )
}

export default Navbar