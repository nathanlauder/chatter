import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';
import { post } from '../../Api/Api';
import { ls } from '../../Api/storage';
import { sendMessage as sendMessageEndpoint } from '../../Api/Endpoints';

const Wrapper = styled.div`
  background-color: var(--black);
  display: flex;
  width: calc(100% - 300px);
  position: absolute;
  bottom: 0;
  padding: 1rem 0;
  height: 50px;
`;

const MessageInput = styled.input`
  font-size: 1rem;
  background-color: transparent;
  border: 2px solid var(--grey);
  width: 100%;
  border-radius: 5px;
  padding: 0.3rem;
  margin-left: 2rem;
  letter-spacing: 1.5px;

  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  background-color: var(--frost);
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  border: none;
  margin: 0 1rem;
  cursor: pointer;

  svg {
    background-color: transparent;
    font-size: 30px;
    margin-left: 5px;
    margin-top: 5px;
  }
`;

const MessageBar = ({ activeConversation }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    const payload = {
      conversationId: activeConversation,
      senderId: ls.get('id'),
      text: message
    };
    if (message !== '') {
      await post(sendMessageEndpoint, payload);
      setMessage('');
    }
    // TODO: handle errors for sending messages
  };

  return (
    <Wrapper>
      <MessageInput
        value={message}
        onChange={(e) => {
          if (e.key !== 'Enter') setMessage(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSendMessage();
        }}
      />
      <SendButton onClick={() => handleSendMessage()}>
        <IoMdSend />
      </SendButton>
    </Wrapper>
  );
};

MessageBar.propTypes = {
  activeConversation: PropTypes.string.isRequired
};

export default MessageBar;