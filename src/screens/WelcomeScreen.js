import React, { Component } from 'react';
import { Button, View, Text} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as actions from '../actions';
import firebaseApi from './keys';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
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
    firebase.initializeApp(config);
    this.props.authUser();
    console.log('auth state', this.props.auth);
  }

  // constructor(props) {
  //   super(props);
  //   this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  // }

  // onNavigatorEvent(event) {
  //   console.log('event', event);
  //   console.log('parts', event.link);
  //   if (event.type === 'DeepLink') {
  //     const parts = event.link;
  //     if (parts === 'seker.WelcomeScreen') {
  //       this.props.navigator.push({
  //         title: 'Welcome',
  //         screen: 'seker.WelcomeScreen'
  //       })
  //     }
  //   }
  // }

  loginHandler = () => {
    startMainTabs();
  }
  
  render() {
    return (
      <View>
        <Text>Welcome to Seker</Text>
        <Text>The best place to rent and loan tools!</Text>
        <Button title='Find Tools' onPress={this.loginHandler} />
        <SignUp />
        <SignIn />
      </View>
    )
  }


}

function mapStateToProps(state) {
  return({
    auth: state.auth
  }) 
}

export default connect(null, actions)(WelcomeScreen);