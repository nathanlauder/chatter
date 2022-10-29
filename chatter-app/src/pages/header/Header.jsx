/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ProfilePicture, Title } from './HeaderComponents';

const Container = styled.div`
  height: 75px;
  border-bottom: 2px solid var(--grey);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
  margin-left: 1rem;
  font-family: 'Satisfy';
  font-size: 2.75rem;
`;

const Header = ({ activeConversation }) => {
  // eslint-disable-next-line no-unused-vars
  const conversationIsEmpty = () => (activeConversation !== '' ? activeConversation : '');

  return (
    <Container>
      {/* <Title>{activeConversation}</Title> */}
      <Logo>Chatter</Logo>
      <ProfilePicture />
    </Container>
  );
};

Header.propTypes = {
  activeConversation: PropTypes.string.isRequired
};

export default Header;