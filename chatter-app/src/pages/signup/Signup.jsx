/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { postSignup } from '../../Api/Api';

import Link from '../../components/Link';
import ButtonLink from '../../components/ButtonLink';
import {
  SignupWrapper,
  SignupContainer,
  SignupTitle,
  SignupLabel,
  SignupInput,
  LoginLinkContainer
} from './SignupComponents';
import colors from '../../util/colors';
import redirect from '../../util/redirect';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const isValidEmail = (emailToValidate) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(emailToValidate);
  };

  const validateSignup = () => {
    const errorList = [];
    if (!(username.length >= 5 && username.length <= 30)) {
      errorList.push('Usernames must be between 5 and 30 characters long.');
    }
    if (!isValidEmail(email)) {
      errorList.push('Email must conform to name@domain.com template.');
    }
    if (!(password.length >= 10 && password.length <= 50)) {
      errorList.push('Password must be between 10 and 50 characters long.');
    }
    if (password !== confirmedPassword) {
      errorList.push('Password confirmation must match password.');
    }
    setErrors(errorList);
  };

  const handleSignup = async () => {
    validateSignup();
    // send Api request
    if (errors.length === 0) {
      const data = {
        username,
        email,
        password
      };
      if (postSignup(data)) redirect('/');
    }
  };

  return (
    <SignupWrapper>
      <SignupContainer>
        <SignupTitle>Sign Up</SignupTitle>
        <SignupLabel htmlFor="username">
          Username
        </SignupLabel>
        <SignupInput
          type="text"
          placeholder="user1234"
          min={5}
          max={30}
          onChange={(e) => setUsername(e.target.value)}
        />

        <SignupLabel htmlFor="email">
          Email
        </SignupLabel>
        <SignupInput
          type="text"
          placeholder="name@domain.com"
          min={5}
          onChange={(e) => setEmail(e.target.value)}
        />

        <SignupLabel htmlFor="password">
          Password
        </SignupLabel>
        <SignupInput
          type="password"
          placeholder="SuperS3cureP4ssword"
          min={10}
          max={50}
          onChange={(e) => setPassword(e.target.value)}
        />

        <SignupLabel htmlFor="password-confirm">
          Confirm password
        </SignupLabel>
        <SignupInput
          type="password"
          placeholder="SuperS3cureP4ssword"
          min={10}
          max={50}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />

        {errors.length > 0 && (
          <ul>
            {
              errors.map((err) => (
                <li>{err}</li>
              ))
            }
          </ul>
        )}

        <ButtonLink onClick={() => handleSignup()}>
          Sign Up
        </ButtonLink>

        <LoginLinkContainer>
          Already have an account?&nbsp;
          <Link
            href="/login"
            color={colors.frost}
            bold
          >
            Log In
          </Link>
        </LoginLinkContainer>
      </SignupContainer>
    </SignupWrapper>
  );
};

export default Signup;