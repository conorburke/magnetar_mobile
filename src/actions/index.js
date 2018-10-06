import { AsyncStorage } from 'react-native';
import axios from 'axios';

import {
  AUTH_USER,
  CREATE_PROFILE,
  DELETE_TOOL,
  FETCH_TOOL,
  FETCH_TOOLS,
  FETCH_USER_TOOLS,
  FETCH_USERS,
  FILTER_TOOLS,
  FILTER_USERS,
  SET_PHONE_NUMBER,
  SET_EMAIL
} from './types';
import url from '../utils';
import { toolsQuery } from './queries';

// export const setPhoneNumber = phone => {
//   return { type: SET_PHONE_NUMBER, payload: phone };
// };

export const setEmail = email => {
  return { type: SET_EMAIL, payload: email };
};

export const authUser = token => {
  return function(dispatch) {
    if (token) {
      console.log('token', token);
      AsyncStorage.setItem('auth_token', token);
      dispatch({ type: AUTH_USER, payload: token });
    } else {
      AsyncStorage.getItem('auth_token').then(res => {
        console.log('token get', res);
        if (res) {
          dispatch({ type: AUTH_USER, payload: res });
        } else {
        }
      });
    }
  };
};

export const filterTools = text => {
  return { type: FILTER_TOOLS, payload: text };
};

export const filterUsers = text => {
  return { type: FILTER_USERS, payload: text };
};

export const deleteTool = id => {
  return function(dispatch) {
    axios
      .delete(`${url.api}/tools/${id}`)
      .then(res => console.log('delete response', res))
      .then(() =>
        axios
          .get(`${url.api}/tools`)
          .then(res => dispatch({ type: FETCH_TOOLS, payload: res.data }))
      );
  };
};

export const createProfile = profile => {
  console.log('token 3', profile);
  return function(dispatch) {
    AsyncStorage.setItem('profile_id', profile.email.toString());
    dispatch({ type: CREATE_PROFILE, payload: profile });
  };
};

export const fetchProfile = id => {
  return function(dispatch) {
    axios.get(`${url.api}/users/${id}`).then(res => {
      console.log('fetch profile action', res);
      dispatch({ type: CREATE_PROFILE, payload: res.data });
    });
  };
};

export const fetchTools = () => {
  //return function to have redux-thunk use dispact function
  //normally would just return object, but thunk will see function
  //and apply middleware
  return function(dispatch) {
    axios
      .post(`${url.api}/oracle`, { query: toolsQuery })
      .then(res => dispatch({ type: FETCH_TOOLS, payload: res.data }));
  };
};

export const fetchUsers = () => {
  return function(dispatch) {
    axios.get(`${url.api}/users`).then(res => {
      window.console.log('lasjflajsfjsaf', res);
      dispatch({ type: FETCH_USERS, payload: res.data });
    });
  };
};

export const fetchTool = id => {
  return function(dispatch) {
    axios
      .get(`${url.api}/tools/${id}`)
      .then(res => dispatch({ type: FETCH_TOOL, payload: res.data }));
  };
};

export const fetchUserTools = id => {
  return function(dispatch) {
    axios
      .get(`${url.api}/users/${id}/tools`)
      .then(res => dispatch({ type: FETCH_USER_TOOLS, payload: res.data }));
  };
};
