import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MessageCard from './MessageCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const MessageCards = ({ messageList }) => (
  <Container>
    {messageList.map((message) => <MessageCard message={message} />)}
  </Container>
);

MessageCards.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  messageList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MessageCards;