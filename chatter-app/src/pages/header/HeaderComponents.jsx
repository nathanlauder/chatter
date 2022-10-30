import React from 'react';
import styled from 'styled-components';
import Link from '../../components/Link';

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

const ProfilePicture = () => (
  <ImgContainer id="ImgContainer">
    <Link href="/settings">
      <Img src="https://i.imgur.com/6VBx3io.png" alt="profile" />
    </Link>
  </ImgContainer>
);

// eslint-disable-next-line import/prefer-default-export
export { ProfilePicture };