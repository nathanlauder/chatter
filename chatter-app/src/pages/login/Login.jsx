import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { postLogin } from '../../Api/Api';
import Link from '../../components/Link';
import ButtonLink from '../../components/ButtonLink';
import {
  LoginWrapper,
  LoginContainer,
  LoginTitle,
  LoginLabel,
  LoginInput,
  UsernameLoginContainer,
  PasswordLoginContainer,
  SignupLinkContainer
} from './LoginComponents';
import colors from '../../util/colors';

const Login = () => {
  const VISIBILITY = {
    HIDDEN: false,
    VISIBLE: true
  };

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(VISIBILITY.HIDDEN);
  const [passwordType, setPasswordType] = useState('password');

  const togglePasswordVisibility = () => {
    if (passwordVisibility === VISIBILITY.HIDDEN) {
      setPasswordVisibility(VISIBILITY.VISIBLE);
      setPasswordType('text');
    } else {
      setPasswordVisibility(VISIBILITY.HIDDEN);
      setPasswordType('password');
    }
  };

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
      if (await postLogin(data)) {
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
        <UsernameLoginContainer>
          <LoginInput
            type="text"
            placeholder="user1234"
            min={5}
            max={30}
            onChange={(e) => setUsername(e.target.value)}
          />
        </UsernameLoginContainer>

        <LoginLabel htmlFor="password">
          Password
        </LoginLabel>
        <PasswordLoginContainer>
          <LoginInput
            type={passwordType}
            placeholder="SuperS3cureP4ssword"
            min={10}
            max={50}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordVisibility ? (
            <AiFillEye onClick={() => togglePasswordVisibility()} />
          ) : (
            <AiFillEyeInvisible onClick={() => togglePasswordVisibility()} />
          )}
        </PasswordLoginContainer>

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