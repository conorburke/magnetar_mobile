import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startMainTabs = () => {
  Promise.all([
    Icon.getImageSource('ios-hammer', 30),
    Icon.getImageSource('ios-people', 30),
    Icon.getImageSource('ios-menu', 30),
    Icon.getImageSource('ios-person', 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'seker.ToolsScreen',
          label: 'Tools',
          title: 'Tools',
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                Title: 'Menu',
                id: 'SideDrawerScreenToggle'
              }
            ]
          }
        },
        {
          screen: 'seker.UsersScreen',
          label: 'Users',
          title: 'Users',
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                Title: 'Menu',
                id: 'SideDrawerScreenToggle'
              }
            ]
          }
        },
        {
          screen: 'seker.ProfileScreen',
          label: 'Profile',
          title: 'Profile',
          icon: sources[3],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                Title: 'Menu',
                id: 'SideDrawerScreenToggle'
              }
            ]
          }
        }
      ],
      drawer: {
        left: {
          screen: 'seker.SideDrawerScreen'
        }
      }
    });
  });
};

export default startMainTabs;
