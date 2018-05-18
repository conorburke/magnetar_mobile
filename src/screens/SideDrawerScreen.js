import React, { Component } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';

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

  render() {
    return (
      <View style={[styles.container, {width: Dimensions.get('window').width * 0.9}]}>
        <Text>Side Drawer</Text>
        <Button title='Home' onPress={this.goToHome.bind(this)} />
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