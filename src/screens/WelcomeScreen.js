import React, { Component } from 'react';
import { AsyncStorage, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
import SignIn from '../components/SignIn';
import startMainTabs from './startMainTabs';

class WelcomeScreen extends Component {
  componentDidMount() {
    this.props.authUser();

    AsyncStorage.getItem('auth_token').then(res => {
      if (res) {
        startMainTabs();
      }
    });
  }

  render() {
    return (
      <View>
        <View style={styles.topContainer}>
          <Text style={styles.titleText}>Magnetar</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.tagText}>The Modern Blacksmith.</Text>
          <Text style={styles.baseText}>Buy. Rent. Build. Create.</Text>
        </View>
        <SignIn navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagText: {
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
    fontSize: 22
  },
  baseText: {
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
    fontSize: 18
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e4000f',
    fontFamily: 'Futura'
  },
  container: {
    marginBottom: 15
  },
  topContainer: {
    marginTop: 15,
    marginBottom: 15
  }
});

function mapStateToProps(state) {
  return { auth: state.auth, profile: state.profile };
}

export default connect(
  mapStateToProps,
  actions
)(WelcomeScreen);
