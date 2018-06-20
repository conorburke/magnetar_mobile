import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import axios from 'axios';

const rootUrl = 'https://us-central1-seker-auth.cloudfunctions.net';

class SignUp extends Component {
  state = {phone: ''};

  handleSubmit() {
    axios.post(`${rootUrl}/createUser`, {phone: this.state.phone})
      .then(() => {axios.post(`${rootUrl}/requestOneTimePassword`, {phone: this.state.phone})})
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
        <Button 
            title='Submit'
            onPress={this.handleSubmit.bind(this)}
          />
      </View>
    );
  }
}

export default SignUp;