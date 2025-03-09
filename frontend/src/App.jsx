import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Adminpanel from './pages/Adminpanel';
import AdminAddplayer from './pages/AdminAddplayer';
import AdminPlayers from './pages/AdminPlayers';
import PlayerProfile from './pages/PlayerProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Adminpanel/>} />
        <Route path="/admin/addplayer" element={<AdminAddplayer/>} />
        <Route path="/admin/player" element={<AdminPlayers/>} />
        <Route path="/playerpro" element={<PlayerProfile/>} />
      </Routes>
    </Router>
  )
}

export default App