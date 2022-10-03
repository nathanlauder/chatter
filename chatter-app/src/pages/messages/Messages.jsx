import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import redirect from '../../util/redirect';
import Header from '../header/Header';
import Conversations from './components/conversations/Conversations';
import MessageCards from './MessageCards';
import MessageBar from './MessageBar';
import { ls } from '../../Api/storage';

import { post } from '../../Api/Api';
import { getMessages as messageEndpoint } from '../../Api/Endpoints';

const Container = styled.div`
  display: flex;
`;

const InnerContainer = styled.div`
  width: calc(100% - 300px);
  min-width: calc(100% - 300px);
`;

const UnselectedConversation = styled.div`
  top: 50%;
  left: calc(50% - 265px);
  position: absolute;
  font-size: 1.2rem;
  background-color: transparent;
`;

const Messages = () => {
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState('');
  const [activeConversationTitle, setActiveConversationTitle] = useState('');
  const [messageList, setMessages] = useState([]);

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

  useEffect(() => {
    const getMessages = async () => {
      const payload = { conversationId: activeConversationId };
      const data = await post(messageEndpoint, payload);
      setMessages(data);
    };
    getMessages();
  }, [activeConversationId]);

  const handleConversationClick = (conversation) => {
    setActiveConversationId(conversation._id);
    setActiveConversationTitle(conversation.title);
  };

  return !isLoggedIn ? (
    <div>You aren't logged in</div>
  ) : (
    <>
      <Header activeConversation={activeConversationTitle} />
      <Container>
        <InnerContainer>
          {activeConversationId === '' ? (
            <UnselectedConversation>Select a conversation</UnselectedConversation>
          ) : (
            <>
              <MessageCards messageList={messageList} />
              <MessageBar activeConversation={activeConversationId} />
            </>
          )}
        </InnerContainer>

        <Conversations setActiveConversation={handleConversationClick} />
      </Container>
    </>
  );
};

export default Messages;