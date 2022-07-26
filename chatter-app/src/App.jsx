import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;