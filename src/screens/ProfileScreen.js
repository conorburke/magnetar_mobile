import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
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

  render() {
    console.log('on profile screen');
    return (
      <Card title="Profile">
        <Text>{this.props.profile.FirstName}</Text>
        <Text>{this.props.profile.LastName}</Text>
        <Text>{this.props.profile.Email}</Text>
        <Text>{this.props.profile.PhoneNumber}</Text>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {profile: state.profile}
}

export default connect(mapStateToProps)(ProfileScreen);