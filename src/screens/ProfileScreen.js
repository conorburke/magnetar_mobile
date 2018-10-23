import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    console.log('profile', this.props.profile);
    if (Object.keys(this.props.profile).length === 0) {
      console.log('no profile');
      AsyncStorage.getItem('profile_id').then(res => {
        if (res) {
          console.log('response profile id', res);
          this.props.fetchProfile(res);
        }
      });
    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'SideDrawerScreenToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        });
      }
    }
    if (event.type === 'DeepLink') {
      const parts = event.link;
      if (parts === 'WelcomeScreen') {
        this.props.navigator.resetTo({
          screen: 'seker.WelcomeScreen',
          title: 'Seker'
        });
      } else if (parts === 'ProfileScreen') {
        this.props.navigator.resetTo({
          screen: 'seker.ProfileScreen',
          title: 'Profile'
        });
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

  openAddDepotScreen() {
    this.props.navigator.push({
      screen: 'magnetar.CreateDepotScreen',
      title: 'Add Depot',
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

  openMyDepotsScreen() {
    this.props.navigator.push({
      screen: 'vulcan.UserDepotsScreen',
      title: 'My Depots',
      backButtonTitle: 'Back to Profile'
    });
  }

  render() {
    console.log('on profile screen');
    return (
      <View style={styles.container}>
        <Card title="Profile">
          <Text>{this.props.profile.first_name}</Text>
          <Text>{this.props.profile.last_name}</Text>
          <Text>{this.props.profile.email}</Text>
          <Text>{this.props.profile.phone_number}</Text>
          <View style={styles.button}>
            <Button
              title="Add Tool"
              backgroundColor="#e4000f"
              rounded={true}
              raised={true}
              fontSize={22}
              onPress={this.openAddToolsScreen.bind(this)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Add Depot"
              backgroundColor="#e4000f"
              rounded={true}
              raised={true}
              fontSize={22}
              onPress={this.openAddDepotScreen.bind(this)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="My Tools"
              backgroundColor="#e4000f"
              rounded={true}
              raised={true}
              fontSize={22}
              onPress={this.openMyToolsScreen.bind(this)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="My Depots"
              backgroundColor="#e4000f"
              rounded={true}
              raised={true}
              fontSize={22}
              onPress={this.openMyDepotsScreen.bind(this)}
            />
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

function mapStateToProps(state) {
  return { profile: state.profile };
}

export default connect(
  mapStateToProps,
  actions
)(ProfileScreen);
