import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'SideDrawerScreenToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        })
      }
    }
    if (event.type === 'DeepLink') {
      const parts = event.link;
      if (parts === 'WelcomeScreen') {
        this.props.navigator.resetTo({
          screen: 'seker.WelcomeScreen',
          title: 'Seker'
        })
      } else if (parts === 'ProfileScreen') {
        this.props.navigator.resetTo({
          screen: 'seker.ProfileScreen',
          title: 'Profile'
        })
      }
    }
  }

  openAddToolsScreen() {
    this.props.navigator.push({
      screen: 'seker.CreateToolScreen',
      title: 'Add Tool',
      backButtonTitle: 'Back to Profile'
    });
  }

  openMyToolsScreen() {
    this.props.navigator.push({
      screen: 'seker.UserToolsScreen',
      title: 'My Tools',
      backButtonTitle: 'Back to Profile'
    });
  }

  render() {
    console.log('on profile screen');
    return (
      <Card title="Profile">
        <Text>{this.props.profile.FirstName}</Text>
        <Text>{this.props.profile.LastName}</Text>
        <Text>{this.props.profile.Email}</Text>
        <Text>{this.props.profile.PhoneNumber}</Text>
        <Button title='Add Tools' onPress={this.openAddToolsScreen.bind(this)}></Button>
        <Button title='My Tools' onPress={this.openMyToolsScreen.bind(this)}></Button>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {profile: state.profile}
}

export default connect(mapStateToProps)(ProfileScreen);