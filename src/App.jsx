import React from 'react';
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

function App() {
  return (
    <div className="bg-white">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;