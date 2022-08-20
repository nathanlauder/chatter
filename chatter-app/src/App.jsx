import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Messages from './pages/messages/Messages';
// import { postLogout } from './Api/Api';
import { ls } from './Api/storage';

const App = () => {
  useEffect(() => {
    // let tabCount = ls.get('tabs');
    // if (Number.isNaN(tabCount)) ls.set('tabs', 0);
    // else {
    //   tabCount++;
    //   ls.set('tabs', tabCount);
    // }
    // console.log(window);

    const beforeTabClose = (e) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to close Chatter?';
    };

    const closeTab = () => {
      // let tabs = ls.get('tabs');
      // tabs--;
      // if (tabs) ls.set('tabs', tabs);
      // if (tabs < 1)
      ls.clear();
    };

    window.addEventListener('beforeunload', beforeTabClose);
    window.addEventListener('unload', closeTab);

    return () => {
      window.removeEventListener('beforeunload', beforeTabClose);
      window.removeEventListener('unload', closeTab);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Messages />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;