import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';
import startMainTabs from '../screens/startMainTabs';
import url from '../utils';

class CreateProfileScreen extends Component {
  state = {
    FirstName: '',
    LastName: '',
    Email: '',
    Address1: '',
    Address2: '',
    City: '',
    Region: '',
    Zipcode: ''
  };

  handleSubmit() {
    axios
      .post(`${url.api}/users`, {
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Email: this.state.Email,
        PhoneNumber: this.props.phoneNumber,
        Address1: this.state.Address1,
        Address2: this.state.Address2,
        City: this.state.city,
        Region: this.state.Region,
        Zipcode: this.state.Zipcode
      })
      .then(({ data }) => {
        this.props.createProfile(data);
        startMainTabs();
      })
      .catch(err => {
        console.log('current state', this.state);
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <FormLabel>Enter First Name</FormLabel>
            <FormInput
              value={this.state.FirstName}
              onChangeText={FirstName => this.setState({ FirstName })}
            />
          </View>
          <View>
            <FormLabel>Enter Last Name</FormLabel>
            <FormInput
              value={this.state.LastName}
              onChangeText={LastName => this.setState({ LastName })}
            />
          </View>
          <View>
            <FormLabel>Enter Email</FormLabel>
            <FormInput
              value={this.state.Email}
              onChangeText={Email => this.setState({ Email })}
            />
          </View>
          <View>
            <FormLabel>Enter Phone Number</FormLabel>
            <FormInput value={this.props.phoneNumber} />
          </View>
          <View>
            <FormLabel>Enter Address 1</FormLabel>
            <FormInput
              value={this.state.Address1}
              onChangeText={Address1 => this.setState({ Address1 })}
            />
          </View>
          <View>
            <FormLabel>Enter Address 2</FormLabel>
            <FormInput
              value={this.state.Address2}
              onChangeText={Address2 => this.setState({ Address2 })}
            />
          </View>
          <View>
            <FormLabel>Enter City</FormLabel>
            <FormInput
              value={this.state.City}
              onChangeText={City => this.setState({ City })}
            />
          </View>
          <View>
            <FormLabel>Enter State</FormLabel>
            <FormInput
              value={this.state.Region}
              onChangeText={Region => this.setState({ Region })}
            />
          </View>
          <View>
            <FormLabel>Enter Zipcode</FormLabel>
            <FormInput
              value={this.state.Zipcode}
              onChangeText={Zipcode => this.setState({ Zipcode })}
            />
          </View>

          <Button title="Submit" onPress={this.handleSubmit.bind(this)} />
        </ScrollView>
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
    justifyContent: 'flex-start'
  }
});

function mapStateToProps(state) {
  return { phoneNumber: state.users.phoneNumber };
}

export default connect(
  mapStateToProps,
  actions
)(CreateProfileScreen);
