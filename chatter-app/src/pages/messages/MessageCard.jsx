import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ls } from '../../Api/storage';

const MessageText = styled.div`
  background-color: transparent;
`;

const TimeStamp = styled.div`
  background-color: transparent;
  margin-top: 0.5rem;
  ${({ myMessage }) => (myMessage && 'float: right;')}
`;

const Card = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: max-content;
  max-width: 55%;
  border-radius: 5px;
  ${({ myMessage }) => (myMessage
    ? 'margin-left: auto; background-color: var(--frost);'
    : 'background-color: var(--grey);'
  )}
`;

const MessageCard = ({ message }) => {
  const isMyMessage = message.sender === ls.get('id');
  return (
    <Card myMessage={isMyMessage}>
      <MessageText>{message.text}</MessageText>
      <TimeStamp myMessage={isMyMessage}>{new Date(message.timeStamp).toLocaleString()}</TimeStamp>
    </Card>
  );
};

MessageCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired
};

export default MessageCard;