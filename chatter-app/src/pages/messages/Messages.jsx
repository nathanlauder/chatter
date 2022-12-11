// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';

import redirect from '../../util/redirect';
import Header from '../header/Header';
import Conversations from './components/conversations/Conversations';
import MessageCards from './MessageCards';
import MessageBar from './MessageBar';
import { ls } from '../../Api/storage';
import { post } from '../../Api/Api';
import { host, getMessages as messageEndpoint } from '../../Api/Endpoints';

const Container = styled.div`
  display: flex;
`;

const InnerContainer = styled.div`
  width: calc(100% - 300px);
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
  const [userId, setUserId] = useState('');
  const [activeConversationId, setActiveConversationId] = useState('');
  const [messageList, setMessages] = useState([]);
  const messageRef = createRef();
  // const [singleMessage, setSingleMessage] = useState(null);
  const socket = {};
  socket.current = io(host);

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
      setUserId(ls.get('id'));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('user logged in.  emitting connection');
      socket.current.emit('connect-user', userId);
    }
  }, []);

  socket.current.on('receive-msg', (newMessage) => {
    console.log(`Receiving message ${newMessage.text}`);
    console.log(newMessage);
    setMessages((previousMessages) => [...previousMessages, newMessage]);
    console.log(messageList);
  });

  useEffect(() => {
    if (messageList.length > 0) console.log('message list isnt blank');
    if (messageList.length === 0) console.log('MESSAGE LIST BLANK');
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  useEffect(() => {
    const getMessages = async () => {
      const payload = { conversationId: activeConversationId };
      socket.current.emit('connect-chat', payload.conversationId, (res) => console.log(res));
      const data = await post(messageEndpoint, payload);
      console.log(data);
      setMessages(data);
    };
    if (activeConversationId !== '') getMessages();
  }, [activeConversationId]);

  const handleConversationClick = (conversation) => {
    setActiveConversationId(conversation._id);
  };

  return !isLoggedIn ? (
    <div>You aren't logged in</div>
  ) : (
    <>
      <Header />
      <Container>
        <InnerContainer>
          {activeConversationId === '' ? (
            <UnselectedConversation>Select a conversation</UnselectedConversation>
          ) : (
            <>
              <MessageCards
                messageList={messageList}
                messageRef={messageRef}
              />
              <MessageBar
                activeConversation={activeConversationId}
                setMessageList={setMessages}
                socket={socket}
              />
            </>
          )}
        </InnerContainer>

        <Conversations
          activeConversation={activeConversationId}
          setActiveConversation={handleConversationClick}
        />
      </Container>
    </>
  );
};

export default Messages;