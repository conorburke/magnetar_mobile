import { combineReducers } from 'redux';

import authReducer from './authReducer'
import toolsReducer from './toolsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    auth: authReducer,
    tools: toolsReducer,
    users: usersReducer
});