import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';
import startMainTabs from '../screens/startMainTabs';
import url from '../utils';
import { profileMutation } from './mutations';

class CreateProfileScreen extends Component {
  state = {
    FirstName: '',
    LastName: '',
    PhoneNumber: ''
  };

  handleSubmit() {
    axios
      .post(`${url.api}/oracle`, {
        query: profileMutation,
        variables: {
          first_name: this.state.FirstName,
          last_name: this.state.last_name,
          email: this.props.email,
          phone_number: this.props.PhoneNumber
        }
      })
      .then(({ data }) => {
        this.props.createProfile({
          first_name: this.state.FirstName,
          last_name: this.state.LastName,
          email: this.props.email,
          phone_number: this.state.PhoneNumber
        });
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
              value={this.state.first_name}
              onChangeText={FirstName => this.setState({ FirstName })}
            />
          </View>
          <View>
            <FormLabel>Enter Last Name</FormLabel>
            <FormInput
              value={this.state.last_name}
              onChangeText={LastName => this.setState({ LastName })}
            />
          </View>
          <View>
            <FormLabel>Enter Email</FormLabel>
            <FormInput value={this.props.email} />
          </View>
          <View>
            <FormLabel>Enter Phone Number</FormLabel>
            <FormInput
              value={this.state.phone_number}
              onChangeText={PhoneNumber => this.setState({ PhoneNumber })}
            />
          </View>
          <Button
            title="Submit"
            backgroundColor="#e4000f"
            rounded={true}
            raised={true}
            fontSize={22}
            onPress={this.handleSubmit.bind(this)}
          />
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
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

function mapStateToProps(state) {
  return { email: state.users.email };
}

export default connect(
  mapStateToProps,
  actions
)(CreateProfileScreen);
