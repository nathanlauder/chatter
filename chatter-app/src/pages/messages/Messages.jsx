import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// import Search from './components/search/Search';
import redirect from '../../util/redirect';
import Conversations from './components/conversations/Conversations';
import MessageCards from './MessageCards';
import MessageBar from './MessageBar';
import { ls } from '../../Api/storage';

const Container = styled.div`
  display: flex;
`;

const InnerContainer = styled.div`
  width: calc(100% - 300px);
`;

const messageList = [
  {
    _id: '1',
    sender: '62e9cf6f0fc404c6f22afd67',
    text: 'hello',
    timeStamp: new Date(Date.now())
  },
  {
    _id: '2',
    sender: '62e888133db6a3a9411e60c3',
    text: 'hey',
    timeStamp: new Date(Date.now())
  },
  {
    _id: '3',
    sender: '62e9cf6f0fc404c6f22afd67',
    text: 'what\'s up',
    timeStamp: new Date(Date.now())
  },
  {
    _id: '4',
    sender: '62e888133db6a3a9411e60c3',
    text: 'not much bro',
    timeStamp: new Date(Date.now())
  },
  {
    _id: '5',
    sender: '62e9cf6f0fc404c6f22afd67',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timeStamp: new Date(Date.now())
  },
  {
    _id: '6',
    sender: '62e888133db6a3a9411e60c3',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timeStamp: new Date(Date.now())
  },
  {
    _id: '7',
    sender: '62e9cf6f0fc404c6f22afd67',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timeStamp: new Date(Date.now())
  },
  {
    _id: '8',
    sender: '62e888133db6a3a9411e60c3',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timeStamp: new Date(Date.now())
  },
  {
    _id: '9',
    sender: '62e9cf6f0fc404c6f22afd67',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timeStamp: new Date(Date.now())
  },
  {
    _id: '10',
    sender: '62e888133db6a3a9411e60c3',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timeStamp: new Date(Date.now())
  }
];

const Messages = () => {
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [activeConversation, setActiveConversation] = useState('');

  useEffect(() => {
    const loginStatusOptions = {
      LOGGED_IN: true,
      NOT_LOGGED_IN: false
    };
    if (ls.get('username') === null) {
      setLoginStatus(loginStatusOptions.NOT_LOGGED_IN);
      redirect('/login');
    } else {
      setLoginStatus(loginStatusOptions.LOGGED_IN);
    }
  }, []);

  const handleConversationClick = (conversationId) => {
    setActiveConversation(conversationId);
  };

  return !isLoggedIn ? (
    <div>You aren't logged in</div>
  ) : (
    <Container>
      <InnerContainer>
        <MessageCards messageList={messageList} />
        <MessageBar activeConversation={activeConversation} />
      </InnerContainer>
      <Conversations setActiveConversation={handleConversationClick} />
    </Container>
  );
};

export default Messages;