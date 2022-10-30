import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../header/Header';
import Modal from '../../components/Modal';

const Container = styled.div`
  width: 70vw;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  padding-bottom: 2px;
  border-bottom: 2px solid var(--grey);
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  margin: 1rem 1rem 1rem 0;
`;

const InputLabel = styled.label`
  
`;

const LabelTitle = styled.div`
  margin-bottom: 0.5rem;
`;

const InputField = styled.input`
  border: 1px solid var(--grey);
  border-radius: 4px;
  padding: 5px;
  font-size: 1rem;
`;

const Test = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChangeUsernameButton = styled.button`
  border: 1px solid var(--grey);
  font-size: 1rem;
  padding: 5px;
  margin-top: 0.5rem;
  border-radius: 4px;
`;

const DeleteAccountButton = styled.button`
  border: 2px solid var(--grey);
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 2rem;
  background-color: red;
  padding: 5px;
`;

const Settings = () => {
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState('');

  const updateUsername = () => {
    console.log('Updating username');
  };

  return (
    <>
      <Header />
      <Container>

        <Test>
          <Title>Settings</Title>
          <div>wut</div>
        </Test>

        {
          /*
          ******************
          * Appearance Settings
          ******************
          */
        }
        <SectionTitle>Appearance Settings</SectionTitle>

        <Modal />
        {
          // Profile Picture
          // Message Color
        }

        {
          /*
          ******************
          * Account Settings
          ******************
          */
        }

        <SectionTitle>
          Account Settings
        </SectionTitle>

        {/* Change Username */}
        <InputLabel htmlFor="change-username">
          <LabelTitle>Change username:</LabelTitle>
          <InputField
            type="text"
            size="30"
            min="5"
            max="30"
          />
        </InputLabel>
        <div>
          <ChangeUsernameButton type="button" onClick={updateUsername}>
            Update
          </ChangeUsernameButton>
        </div>

        {/* Delete account */}
        <DeleteAccountButton type="button">
          Delete Account
        </DeleteAccountButton>
      </Container>
    </>
  );
};
export default Settings;