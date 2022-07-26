import React from 'react';

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

const Login = () => (
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
      />

      <LoginLabel htmlFor="password">
        Password
      </LoginLabel>
      <LoginInput
        type="password"
        placeholder="SuperS3cureP4ssword"
        min={10}
        max={50}
      />

      <ButtonLink title="Sign In" href="/" />

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

export default Login;