import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RgbaColorPicker } from 'react-colorful';
import Header from '../header/Header';
import Modal from '../../components/Modal';
import MessageCard from '../messages/MessageCard';
import { ls } from '../../Api/storage';

const Container = styled.div`
  width: 70vw;
  margin: 0 auto;

  .colorPickerWrapper {
    display: flex; 
    align-items: center;
  }

  .colorPicker {
    margin-top: 1rem;
    width: 250px;
  }

  .colorPickerWrapper .react-colorful__pointer {
    width: 20px;
    height: 20px;
    border-radius: 3px;
  }

  .colorPickerWrapper .react-colorful__hue-pointer,
  .colorPickerWrapper .react-colorful__alpha-pointer {
    height: 25px;
  }
`;

const SettingsSection = styled.section`
  margin: 2rem 0;
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
  background-color: transparent;
  border: 1px solid var(--grey);
  border-radius: 4px;
  padding: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const Test = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChangeUsernameButton = styled.button`
  border: 1px solid var(--grey);
  background-color: var(--charcoal);
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
  const [modalIsVisible, showConfirmationModal] = useState(false);
  // frost by default 'rgba(22, 96, 160, 1)'
  // eslint-disable-next-line object-curly-newline
  const [chatColor, setChatColor] = useState({ r: 22, g: 96, b: 160, a: 1 });
  const [color, setColor] = useState('rgba(22, 96, 160, 1)');

  const updateUsername = () => {
    console.log('Updating username');
  };

  const formatChatColor = () => {
    const red = chatColor.r;
    const green = chatColor.g;
    const blue = chatColor.b;
    const alpha = chatColor.a;
    const formattedColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    setColor(formattedColor);
  };

  useEffect(() => { formatChatColor(); }, [chatColor]);

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
        <SettingsSection>
          <SectionTitle>Appearance Settings</SectionTitle>

          {/* Profile Picture */}

          {/* Message Color */}

          <InputLabel htmlFor="custom-chat-color">Chat Message Color</InputLabel>
          <div className="colorPickerWrapper">
            <RgbaColorPicker className="colorPicker" color={chatColor} onChange={setChatColor} />
            <MessageCard
              message={{ sender: ls.get('id'), text: 'This is what your new messages would look like!', timeStamp: Date.now() }}
              color={color}
            />
          </div>
        </SettingsSection>

        {
          /*
          ******************
          * Account Settings
          ******************
          */
        }
        <SettingsSection>
          <SectionTitle> Account Settings</SectionTitle>

          {/* Change Username */}
          <InputLabel htmlFor="change-username">
            <LabelTitle>Change username:</LabelTitle>
            <InputField
              type="text"
              size="30"
              min="5"
              max="30"
              placeholder="myNewUsername_01"
            />
          </InputLabel>
          <div>
            <ChangeUsernameButton type="button" onClick={updateUsername}>
              Update
            </ChangeUsernameButton>

          </div>

          {/* Delete account */}
          <DeleteAccountButton
            type="button"
            onClick={() => showConfirmationModal(true)}
          >
            Delete Account
          </DeleteAccountButton>

          {modalIsVisible && (
            <Modal
              title="Delete Account?"
              confirmationMessage="Are you sure you want to delete your account?  This action is unreversible and will permanantly
                                  remove your account from Chatter."
              closeModalFunc={() => showConfirmationModal(false)}
              confirmFunc={() => console.log('Deleting account')}
            />

          )}
        </SettingsSection>
      </Container>
    </>
  );
};

export default Settings;