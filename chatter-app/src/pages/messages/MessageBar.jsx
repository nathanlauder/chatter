import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';

const Wrapper = styled.div`
  background-color: var(--black);
  display: flex;
  width: calc(100% - 300px);
  position: absolute;
  bottom: 0;
  padding: 1rem 0;
  /* height: max-content; */
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

const MessageBar = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    console.log(message);
    setMessage('');
  };

  return (
    <Wrapper>
      <MessageInput
        value={message}
        onChange={(e) => {
          if (e.key !== 'Enter') setMessage(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') sendMessage();
        }}
      />
      <SendButton onClick={() => sendMessage(message)}>
        <IoMdSend />
      </SendButton>
    </Wrapper>
  );
};

export default MessageBar;