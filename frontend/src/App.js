import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login'; // Import the Login component
import Register from './components/Register'; // Import the Login component;
import axios from "axios"

export default function App() {
  const [user, setUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/chats"
          element= {<Chat user={user} />} />
        />
        <Route path="/" element={<Login setUser={setUser} />} />
         <Route path="/register" element={<Register setUser={setUser}/>} />
      </Routes>
    </Router>
  );
}
