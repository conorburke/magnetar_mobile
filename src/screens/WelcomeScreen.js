import React, { Component } from 'react';
import { AsyncStorage, Button, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as actions from '../actions';
import firebaseApi from './keys';
import SignIn from '../components/SignIn';
import startMainTabs from './startMainTabs';

class WelcomeScreen extends Component {
  componentDidMount() {
    // const config = {
    //   apiKey: firebaseApi,
    //   authDomain: 'seker-auth.firebaseapp.com',
    //   databaseURL: 'https://seker-auth.firebaseio.com',
    //   projectId: 'seker-auth',
    //   storageBucket: 'seker-auth.appspot.com',
    //   messagingSenderId: '99352786132'
    // };
    // if (!firebase.apps.length) {
    //   firebase.initializeApp(config);
    // }
    this.props.authUser();

    AsyncStorage.getItem('auth_token').then(res => {
      console.log('token 2', res);
      AsyncStorage.getItem('profile_id').then(res => {
        console.log('profile res', res);
        this.props.fetchProfile(res);
      });
      if (res) {
        startMainTabs();
      }
    });
  }

  loginHandler = () => {
    startMainTabs();
  };

  render() {
    return (
      <View>
        <View style={styles.topContainer}>
          <Text style={styles.titleText}>Magnetar</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.baseText}>Loan. Rent. Build. Create.</Text>
        </View>
        {/* <Button title="Find Tools" onPress={this.loginHandler} /> */}
        <SignIn navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
    fontSize: 22
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
  return { auth: state.auth };
}

export default connect(
  mapStateToProps,
  actions
)(WelcomeScreen);
