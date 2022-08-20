import axios from 'axios';
import {
  login as loginEndpoint,
  signup as signupEndpoint,
  logout as logoutEndpoint
} from './Endpoints';
import { ls } from './storage';

const Status = {
  SUCCESS: true,
  FAILURE: false
};

const get = async (endpoint) => {
  const request = await axios.get(endpoint);
  return request.data;
};

const post = async (endpoint, payload) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = await axios.post(endpoint, payload);
    return data;
  } catch (err) {
    console.log(err.response.data.error);
    return Status.FAILURE;
  }
};

const postSignup = async (payload) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const request = await axios.post(signupEndpoint, payload);
    const { username } = request.data;
    ls.set('username', username);
    return Status.SUCCESS;
  } catch (err) {
    console.log(err.response.data.error);
    return Status.FAILURE;
  }
};

const postLogin = async (payload) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const request = await axios.post(loginEndpoint, payload);
    const { _id, username } = request.data;
    console.log(request.data);
    ls.set('username', username);
    ls.set('id', _id);
    return Status.SUCCESS;
  } catch (err) {
    console.log(err.response.data.error);
    return Status.FAILURE;
  }
};

const postLogout = async () => {
  try {
    const request = await axios.post(logoutEndpoint);
    console.log(request);
    ls.clear();
    return Status.SUCCESS;
  } catch (err) {
    console.log(err.response.data.error);
    return Status.FAILURE;
  }
};

export {
  get,
  post,
  postSignup,
  postLogin,
  postLogout
};