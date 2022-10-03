import React from 'react';
import styled from 'styled-components';

const ImgContainer = styled.div`
  position: absolute;
  // container height - img height / 2
  top: calc((75px - 50px) / 2);
  right: 1.5rem;
`;
const Img = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const Title = styled.div`
  position: absolute;
  top: calc((75px - 1.4rem) / 2);
  left: calc(50% - 265px);
  /* TODO - fix this  to account for different lengths */
  /* transform: translate(-50%); */
  color: var(--white);
  font-size: 1.4rem;
`;

const ProfilePicture = () => (
  <ImgContainer id="ImgContainer">
    <Img src="https://i.imgur.com/6VBx3io.png" alt="profile" />
  </ImgContainer>
);

export { ProfilePicture, Title };