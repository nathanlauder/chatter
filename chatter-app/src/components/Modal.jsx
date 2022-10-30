import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ModalContainer = styled.div`
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
  border: 2px solid var(--grey);
  border-radius: 4px;
  position: fixed;
  left: 10%;
  margin-top: 6rem;
  width: 80%;
`;

const ModalHeader = styled.div`
  border-bottom: 2px solid var(--grey);
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const ModalBody = styled.div`
  text-align: center;
  margin: 0 auto;
`;

const ModalFooter = styled.div`
  display: flex;
  /* border-top: 2px solid var(--grey); */
  padding: 0.25rem 0;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  gap: 10px;
`;

const ModalButton = styled.button`
  padding: 0.5rem;
  border-radius: 4px;
  ${({ color }) => color && `background-color: ${color}`}
`;

const Modal = ({
  title = 'Confirmation',
  confirmationMessage,
  closeModalFunc,
  confirmFunc
}) => (
  <ModalContainer>
    <Content>
      <ModalHeader>
        <>{title}</>
      </ModalHeader>

      <ModalBody>
        {confirmationMessage ? (
          <div>{confirmationMessage}</div>
        ) : (
          <div>Are you sure you want to perform this action?</div>
        )}
      </ModalBody>

      <ModalFooter>
        <ModalButton type="button" onClick={closeModalFunc}>Cancel</ModalButton>
        <ModalButton type="button" color="var(--frost)" onClick={confirmFunc}>Confirm</ModalButton>
      </ModalFooter>
    </Content>
  </ModalContainer>
);

Modal.propTypes = {
  title: PropTypes.string,
  confirmationMessage: PropTypes.string,
  // these are required atm, but they wouldn't be if custom JSX is provided for the buttons
  closeModalFunc: PropTypes.func.isRequired,
  confirmFunc: PropTypes.func.isRequired
};

export default Modal;