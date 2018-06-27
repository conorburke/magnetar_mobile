import { CREATE_PROFILE } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_PROFILE:
      return action.payload || state;
    default:
      return state;
  }
}
