import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import firebase from 'firebase';

import * as actions from '../actions';

const rootUrl = 'https://us-central1-seker-auth.cloudfunctions.net';

class SignIn extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {phone: ''};
  // }

  state = {phone: '', code: ''};

  handleSubmit() {
    axios.post(`${rootUrl}/verifyOneTimePassword`, {phone: this.state.phone, code: this.state.code})
      .then(({data}) => {
        console.log(data);
        firebase.auth().signInWithCustomToken(data.token);
        this.props.authUser(data.token);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View>
        <View>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput 
            value={this.state.phone}
            onChangeText={phone => this.setState({phone})}
          />
        </View>
        <View>
          <FormLabel>Enter Code</FormLabel>
          <FormInput 
            value={this.state.code}
            onChangeText={code => this.setState({code})}
          />
        </View>
        <Button 
            title='Submit'
            onPress={this.handleSubmit.bind(this)}
          />
      </View>
    );
  }
}

export default connect(null, actions)(SignIn);