import React, { Component } from 'react';
import { AsyncStorage, Button, View, Text} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as actions from '../actions';
import firebaseApi from './keys';
import SignIn from '../components/SignIn';
import startMainTabs from './startMainTabs';

class WelcomeScreen extends Component {
  componentDidMount() {
    const config = {
      apiKey: firebaseApi,
      authDomain: "seker-auth.firebaseapp.com",
      databaseURL: "https://seker-auth.firebaseio.com",
      projectId: "seker-auth",
      storageBucket: "seker-auth.appspot.com",
      messagingSenderId: "99352786132"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.props.authUser();

    AsyncStorage.getItem('auth_token')
    .then((res) => {
      AsyncStorage.getItem('profile_id')
        .then(res => {
          this.props.fetchProfile(res);
        })
      if(res) {
        startMainTabs();
      }
    });

  }

  loginHandler = () => {
    startMainTabs();
  }
  
  render() {
    return (
      <View>
        <Text>Welcome to Seker</Text>
        <Text>The best place to rent and loan tools!</Text>
        <Button title='Find Tools' onPress={this.loginHandler} />
        <SignIn navigator={this.props.navigator}/>
      </View>
    )
  }


}

function mapStateToProps(state) {
  return {auth: state.auth}
}

export default connect(mapStateToProps, actions)(WelcomeScreen);