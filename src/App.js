import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import WelcomeScreen from './screens/WelcomeScreen';
import SideDrawerScreen from './screens/SideDrawerScreen';
import ToolDetailScreen from './screens/ToolDetailScreen';
import ToolsScreen from './screens/ToolsScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import UsersScreen from './screens/UsersScreen';

const composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(reducers, composeEnhancers(), applyMiddleware(reduxThunk));


//register screens
Navigation.registerComponent(
  'seker.WelcomeScreen', 
  () => WelcomeScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'seker.ToolsScreen', 
  () => ToolsScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'seker.UsersScreen', 
  () => UsersScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'seker.ToolDetailScreen',
  () => ToolDetailScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'seker.UserDetailScreen',
  () => UserDetailScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'seker.SideDrawerScreen',
  () => SideDrawerScreen
);

//start navigation in app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'seker.WelcomeScreen',
    title: 'Seker'
  }
});
