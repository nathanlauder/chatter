import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import MessageCard from './MessageCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 185px);
  padding: 1.5rem;
  overflow-y: scroll;
`;

const NoMessages = styled.div`
  top: 50%;
  left: calc(50% - 285px);
  position: absolute;
  font-size: 1.2rem;
  background-color: transparent;
`;

const MessageCards = ({ messageList, messageRef }) => (messageList.length > 0 ? (
  <Container>
    {messageList.map((message) => (
      <MessageCard
        key={uuidv4()}
        message={message}
        ref={messageRef}
      />
    ))}
    <div ref={messageRef} />
  </Container>
) : (
  <NoMessages>
    No messages to display...
  </NoMessages>
));

MessageCards.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  messageList: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  messageRef: PropTypes.object.isRequired
};

export default MessageCards;