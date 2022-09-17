import React from 'react';
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';

const MessageBar = () => {
  const Wrapper = styled.div`
    background-color: transparent;
    display: flex;
    width: 100%;
    position: absolute;
    bottom: 0;
    height: max-content;
    margin-bottom: 2rem;
    margin-left: 1rem;
  `;

  const MessageInput = styled.input`
    font-size: 1rem;
    background-color: transparent;
    border: 2px solid var(--grey);
    border-radius: 5px;
    padding: 0.3rem;
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
    margin-left: 1rem;

    svg {
      background-color: transparent;
      font-size: 30px;
      margin-left: 5px;
      margin-top: 5px;
    }
  `;

  return (
    <Wrapper>
      <MessageInput />
      <SendButton>
        <IoMdSend />
      </SendButton>
    </Wrapper>
  );
};

export default MessageBar;