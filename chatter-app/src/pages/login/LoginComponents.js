import styled from 'styled-components';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* width: 100vw; */
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: var(--charcoal);
  border-radius: 5px;
  border: 1px solid var(--grey);
`;

const LoginTitle = styled.h1`
  background-color: transparent;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const LoginLabel = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  background-color: transparent;
`;

const LoginInput = styled.input`
  font-size: 1rem;
  border: 1px solid var(--grey);
  background-color: transparent;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 1rem;
  letter-spacing: 1.5px;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-weight: 700;
    color: var(--grey);
  }
`;

const UsernameLoginContainer = styled.div`width: 95%;`;

const PasswordLoginContainer = styled.div`
  position: relative;
  width: 95%;

  svg {
    position: absolute;
    cursor: pointer;
    background-color: var(--charcoal);
    color: var(--charcoal);
    top: 1px;
    right: -10px;
    font-size: 25px;
    padding: 3.5px;
  }
`;

const SignupLinkContainer = styled.div`
  margin-top: 1.5rem;
`;

export {
  LoginWrapper,
  LoginContainer,
  LoginTitle,
  LoginLabel,
  LoginInput,
  UsernameLoginContainer,
  PasswordLoginContainer,
  SignupLinkContainer
};