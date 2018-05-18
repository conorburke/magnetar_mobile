import { FETCH_TOOLS } from '../actions/types';

export default function(state = [], action) {
    // console.log(action);
    switch (action.type) {
        case FETCH_TOOLS:
            // console.log('action.payload', action.payload);
            // console.log('state', state);
            return action.payload || state;
            // return action.payload || false;
        default:
            return state
    }
}