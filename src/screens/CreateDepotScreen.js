import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';
import { createDepot } from './mutations';
import url from '../utils';

class CreateDepotScreen extends Component {
  state = {
    address1: '',
    address2: '',
    city: '',
    region: '',
    zipcode: ''
  };

  handleSubmit() {
    window.console.log('depot submit', this.state);
    window.console.log('ownerid', this.props.profile.id);
    axios
      .post(`${url.api}/oracle`, {
        query: createDepot,
        variables: {
          address1: this.state.address1,
          address2: this.state.address2,
          city: this.state.city,
          region: this.state.region,
          zipcode: parseInt(this.state.zipcode),
          ownerId: this.props.profile.id
        }
      })
      .then(({ data }) => {
        console.log('created depot', data);
      })
      .catch(err => {
        console.log('current state', this.state);
        console.log(err);
      });
    this.props.navigator.pop({
      animated: true,
      animationType: 'fade'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FormLabel>Address 1</FormLabel>
          <FormInput
            value={this.state.address1}
            onChangeText={address1 => this.setState({ address1 })}
          />
        </View>
        <View>
          <FormLabel>Address 2</FormLabel>
          <FormInput
            value={this.state.address2}
            onChangeText={address2 => this.setState({ address2 })}
          />
        </View>
        <View>
          <FormLabel>City</FormLabel>
          <FormInput
            value={this.state.city}
            onChangeText={city => this.setState({ city })}
          />
        </View>
        <View>
          <FormLabel>State</FormLabel>
          <FormInput
            value={this.state.region}
            onChangeText={region => this.setState({ region })}
          />
        </View>
        <View>
          <FormLabel>Zipcode</FormLabel>
          <FormInput
            value={this.state.zipcode}
            onChangeText={zipcode => this.setState({ zipcode })}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Submit"
            backgroundColor="#e4000f"
            rounded={true}
            raised={true}
            fontSize={22}
            onPress={this.handleSubmit.bind(this)}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { profile: state.profile };
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

export default connect(
  mapStateToProps,
  actions
)(CreateDepotScreen);
