import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';
import url from '../utils';

class RentToolScreen extends Component {
  state = { StartDate: '', EndDate: '' };

  handleSubmit() {
    axios
      .post(`${url.api}/rent/${this.props.ID}`, {
        ID: this.props.ID,
        StartDate: Date.parse(this.state.StartDate),
        EndDate: Date.parse(this.state.EndDate)
      })
      .then(({ data }) => {
        console.log('data from rented tool', data);
      })
      .catch(err => {
        console.log('current state', this.state);
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>{`Rent: ${this.props.title}`}</Text>
        </View>
        <View>
          <FormLabel>Enter Start Date</FormLabel>
          <FormInput
            value={this.state.StartDate}
            onChangeText={StartDate => this.setState({ StartDate })}
          />
        </View>
        <View>
          <FormLabel>Enter End Date</FormLabel>
          <FormInput
            value={this.state.EndDate}
            onChangeText={EndDate => this.setState({ EndDate })}
          />
        </View>
        <Button
          title="Rent"
          backgroundColor="#e4000f"
          rounded={true}
          raised={true}
          fontSize={22}
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
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  header: {
    color: '#e4000f',
    fontSize: 30
  }
});

export default connect(
  null,
  actions
)(RentToolScreen);
