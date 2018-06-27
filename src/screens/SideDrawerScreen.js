import React, { Component } from 'react';
import {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button } from 'react-native-elements';

import startMainTabs from './startMainTabs';

class SideDrawerScreen extends Component {
  goToHome() {
    AsyncStorage.getItem('auth_token').then(res => {
      AsyncStorage.getItem('profile_id').then(res => {
        this.props.fetchProfile(res);
      });
      if (res) {
        startMainTabs();
      } else {
        console.log('navigator props', this.props.navigator);
        this.props.navigator.handleDeepLink({
          link: 'WelcomeScreen'
        });
        this.props.navigator.toggleDrawer({
          to: 'closed',
          side: 'left',
          animated: 'true'
        });
      }
    });
  }

  goToProfile() {
    this.props.navigator.handleDeepLink({
      link: 'ProfileScreen'
    });
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'left',
      animated: 'true'
    });
  }

  handleSubmit() {
    AsyncStorage.removeItem('auth_token').then(() => {
      this.props.navigator.handleDeepLink({
        link: 'WelcomeScreen'
      });
      this.props.navigator.toggleDrawer({
        to: 'closed',
        side: 'left',
        animated: 'true'
      });
    });
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get('window').width * 0.9 }
        ]}
      >
        <Text>Side Drawer</Text>
        <TouchableOpacity>
          <View style={styles.button}>
            <Button
              title="Home"
              backgroundColor="#3F3F3F"
              onPress={this.goToHome.bind(this)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Log Out"
              backgroundColor="#3F3F3F"
              onPress={this.handleSubmit.bind(this)}
            />
          </View>
          {/* <Button title='Profile' onPress={this.goToProfile.bind(this)} /> */}
        </TouchableOpacity>
      </View>
    );
  }
}

export default SideDrawerScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#C4C4C4',
    flex: 1
  },
  button: {
    margin: 5
  }
});
