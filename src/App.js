import { AsyncStorage } from 'react-native';
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
import CreateProfileScreen from './screens/CreateProfileScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreateToolScreen from './screens/CreateToolScreen';
import UserToolsScreen from './screens/UserToolsScreen';
import RentToolConfirmScreen from './screens/RentToolConfirmScreen';
import RentToolEndDateScreen from './screens/RentToolEndDateScreen';
import RentToolStartDateScreen from './screens/RentToolStartDateScreen';
import startMainTabs from './screens/startMainTabs';
import CreateDepotScreen from './screens/CreateDepotScreen';
import UserDepotsScreen from './screens/UserDepotsScreen';
import CreateCreditCardScreen from './screens/CreateCreditCardScreen';
import SelectPaymentScreen from './screens/SelectPaymentScreen';

const composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  reducers,
  composeEnhancers(),
  applyMiddleware(reduxThunk)
);

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
Navigation.registerComponent('seker.SideDrawerScreen', () => SideDrawerScreen);
Navigation.registerComponent(
  'seker.CreateProfileScreen',
  () => CreateProfileScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'seker.ProfileScreen',
  () => ProfileScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'seker.CreateToolScreen',
  () => CreateToolScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'seker.UserToolsScreen',
  () => UserToolsScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'vulcan.UserDepotsScreen',
  () => UserDepotsScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'seker.RentToolConfirmScreen',
  () => RentToolConfirmScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'seker.RentToolEndDateScreen',
  () => RentToolEndDateScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'seker.RentToolStartDateScreen',
  () => RentToolStartDateScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'magnetar.CreateDepotScreen',
  () => CreateDepotScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'magnetar.CreateCreditCardScreen',
  () => CreateCreditCardScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'magnetar.SelectPaymentScreen',
  () => SelectPaymentScreen,
  store,
  Provider
);

AsyncStorage.getItem('auth_token').then(res => {
  if (res) {
    startMainTabs();
  } else {
    //start navigation in app
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'seker.WelcomeScreen',
        title: 'Magnetar'
      }
    });
  }
});
