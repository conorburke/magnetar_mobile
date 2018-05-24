import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { AUTH_USER, DELETE_TOOL, FETCH_TOOLS, FETCH_USERS } from './types';
import url from '../utils';

export const authUser = (token) => {
    return function(dispatch) {
        if (token) {
            AsyncStorage.setItem('auth_token', token);
            dispatch({type: AUTH_USER, payload: token});
        } else {
            AsyncStorage.getItem('auth_token')
            .then((res) => {
                if (res) {
                dispatch({type: AUTH_USER, payload: res})
                console.log('dispatched');
                console.log('dis res', res);
                console.log('after');
                } else {
                    console.log('not logged in');
                }
            }
            )
        } 
    }
};

export const deleteTool = (id) => {
    return function(dispatch) {
        axios.delete(`${url.api}/tools/${id}`)
            .then(res => console.log('delete response', res))
                .then(() => axios.get(`${url.api}/tools`)
                    .then(res => dispatch({type: FETCH_TOOLS, payload: res.data})));
    }
}

export const fetchTools = () => {
    //return function to have redux-thunk use dispact function
    //normally would just return object, but thunk will see function
    //and apply middleware
    return function(dispatch) {
        axios.get(`${url.api}/tools`)
            .then(res => dispatch({type: FETCH_TOOLS, payload: res.data}));
    }
};

export const fetchUsers = () => {
    return function(dispatch) {
        axios.get(`${url.api}/users`)
            .then(res => dispatch({type: FETCH_USERS, payload: res.data}));
    }
};