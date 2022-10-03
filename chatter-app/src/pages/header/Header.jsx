import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ProfilePicture, Title } from './HeaderComponents';

const Container = styled.div`
    height: 75px;
    border-bottom: 2px solid var(--grey);
    position: relative;
  `;

const Header = ({ activeConversation }) => {
  // eslint-disable-next-line no-unused-vars
  const conversationIsEmpty = () => (activeConversation !== '' ? activeConversation : '');

  return (
    <Container>
      <Title>{activeConversation}</Title>
      <ProfilePicture />
    </Container>
  );
};

Header.propTypes = {
  activeConversation: PropTypes.string.isRequired
};

export default Header;