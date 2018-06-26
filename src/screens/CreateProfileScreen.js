import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';
import startMainTabs from '../screens/startMainTabs';
import url from '../utils';

class CreateProfileScreen extends Component {

  state = {FirstName: '', LastName: '', Email: '', PhoneNumber: ''};

  handleSubmit() {
    axios.post(`${url.api}/users`, {FirstName: this.state.FirstName, LastName: this.state.LastName, Email: this.state.Email,  PhoneNumber: this.state.PhoneNumber})
      .then(({data}) => {
        this.props.createProfile(data);
        startMainTabs();
      })
      .catch(err => {
        console.log('current state', this.state);
        console.log(err)
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FormLabel>Enter First Name</FormLabel>
          <FormInput 
            value={this.state.FirstName}
            onChangeText={FirstName => this.setState({FirstName})}
          />
        </View>
        <View>
          <FormLabel>Enter Last Name</FormLabel>
          <FormInput 
            value={this.state.LastName}
            onChangeText={LastName => this.setState({LastName})}
          />
        </View>
        <View>
          <FormLabel>Enter Email</FormLabel>
          <FormInput 
            value={this.state.Email}
            onChangeText={Email => this.setState({Email})}
          />
        </View>
        <View>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput 
            value={this.state.PhoneNumber}
            onChangeText={PhoneNumber => this.setState({PhoneNumber})}
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

const styles = StyleSheet.create({
  button: {
    margin: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#003B59',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});

export default connect(null, actions)(CreateProfileScreen);