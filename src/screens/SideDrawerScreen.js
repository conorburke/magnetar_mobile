import React, { Component } from 'react';
import { AsyncStorage, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class SideDrawerScreen extends Component {
  // constructor(props) {
  //   super(props);
  // }

  goToHome() {
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
    AsyncStorage.removeItem('auth_token')
      .then(() => {    
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
      <View style={[styles.container, {width: Dimensions.get('window').width * 0.9}]}>
        <Text>Side Drawer</Text>
        <TouchableOpacity>
          <Button title='Home' onPress={this.goToHome.bind(this)} />
          <Button title='Log Out' onPress={this.handleSubmit.bind(this)} />
          {/* <Button title='Profile' onPress={this.goToProfile.bind(this)} /> */}
        </TouchableOpacity>

      </View>
    );
  }
}

export default SideDrawerScreen;

const styles = {
  container: {
    paddingTop: 20,
    backgroundColor: 'white',
    flex: 1
  }
}