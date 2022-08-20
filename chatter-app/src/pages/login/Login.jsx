import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../Api/Api';
import Link from '../../components/Link';
import ButtonLink from '../../components/ButtonLink';
import {
  LoginWrapper,
  LoginContainer,
  LoginTitle,
  LoginLabel,
  LoginInput,
  SignupLinkContainer
} from './LoginComponents';
import colors from '../../util/colors';
// import redirect from '../../util/redirect';

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateInput = () => {
    const errorList = [];
    if (!(username.length >= 5 && username.length <= 30)) {
      errorList.push('Usernames must be between 5 and 30 characters long.');
    }
    if (!(password.length >= 10 && password.length <= 50)) {
      errorList.push('Password must be between 10 and 50 characters long.');
    }
    setErrors(errorList);
  };

  const handleLogin = async () => {
    validateInput();
    if (errors.length === 0) {
      const data = { username, password };
      console.log();
      if (await postLogin(data)) {
        console.log('would be redirecting');
        navigate('/');
      }
    }
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginTitle>Log In</LoginTitle>
        <LoginLabel htmlFor="username">
          Username
        </LoginLabel>
        <LoginInput
          type="text"
          placeholder="user1234"
          min={5}
          max={30}
          onChange={(e) => setUsername(e.target.value)}
        />

        <LoginLabel htmlFor="password">
          Password
        </LoginLabel>
        <LoginInput
          type="password"
          placeholder="SuperS3cureP4ssword"
          min={10}
          max={50}
          onChange={(e) => setPassword(e.target.value)}
        />

        <ButtonLink title="Sign In" href="/" onClick={() => handleLogin()}>Log In</ButtonLink>

        <SignupLinkContainer>
          Don't have an account?&nbsp;
          <Link
            href="/signup"
            color={colors.frost}
            bold
          >
            Sign Up
          </Link>
        </SignupLinkContainer>
      </LoginContainer>
    </LoginWrapper>
  );
};
export default Login;