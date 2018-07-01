import { FETCH_USERS, FILTER_USERS, SET_PHONE_NUMBER } from '../actions/types';

const initialState = {
  usersList: [],
  usersSearch: '',
  phoneNumber: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, ...{ usersList: action.payload } };
    case FILTER_USERS:
      return { ...state, ...{ usersSearch: action.payload } };
    case SET_PHONE_NUMBER:
      return { ...state, ...{ phoneNumber: action.payload } };
    default:
      return state;
  }
}
