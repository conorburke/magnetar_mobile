import { FETCH_USERS, FILTER_USERS } from '../actions/types';

const initialState = {
  usersList: [],
  usersSearch: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, ...{ usersList: action.payload } };
    case FILTER_USERS:
      return { ...state, ...{ usersSearch: action.payload } };
    default:
      return state;
  }
}
