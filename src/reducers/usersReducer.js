import { FETCH_USERS } from '../actions/types';

export default function(state = [], action) {
    // console.log(action);
    switch (action.type) {
        case FETCH_USERS:
            // console.log('action.payload', action.payload);
            // console.log('state', state);
            return action.payload || state;
            // return action.payload || false;
        default:
            return state
    }
}