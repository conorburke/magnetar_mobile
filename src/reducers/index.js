import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import toolReducer from './toolReducer';
import toolsReducer from './toolsReducer';
import userToolsReducer from './userToolsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  tool: toolReducer,
  tools: toolsReducer,
  userTools: userToolsReducer,
  users: usersReducer
});
