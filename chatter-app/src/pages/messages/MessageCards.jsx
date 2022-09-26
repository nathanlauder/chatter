import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MessageCard from './MessageCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(94vh - 50px);
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

const MessageCards = ({ messageList }) => (messageList.length > 0 ? (
  <Container>
    {messageList.map((message) => (
      <MessageCard
        key={message._id}
        message={message}
      />
    ))}
  </Container>
) : (
  <NoMessages>
    No messages to display...
  </NoMessages>
));

MessageCards.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  messageList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MessageCards;