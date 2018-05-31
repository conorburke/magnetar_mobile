import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import toolsReducer from './toolsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    tools: toolsReducer,
    users: usersReducer
});