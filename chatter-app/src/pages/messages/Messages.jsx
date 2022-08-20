import React, { useState, useEffect } from 'react';

import Search from './components/search/Search';
import Conversation from './components/conversations/Conversation';
import { ls } from '../../Api/storage';

const Messages = () => {
  const [isLoggedIn, setLoginStatus] = useState(false);
  useEffect(() => {
    const loginStatusOptions = {
      LOGGED_IN: true,
      NOT_LOGGED_IN: false
    };
    console.log('wut');
    console.log(`Username: ${ls.get('username')}`);
    if (ls.get('username') === null) {
      setLoginStatus(loginStatusOptions.NOT_LOGGED_IN);
    } else {
      setLoginStatus(loginStatusOptions.LOGGED_IN);
    }
  }, []);

  return !isLoggedIn ? (
    <div>You aren't logged in</div>
  ) : (
    <>
      <Search />
      <Conversation />
    </>
  );
};

export default Messages;