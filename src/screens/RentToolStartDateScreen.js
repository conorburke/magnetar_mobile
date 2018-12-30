import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import CalendarPicker from 'react-native-calendar-picker';

import * as actions from '../actions';

class RentToolStartDateScreen extends Component {
  onDateChange(date) {
    this.props.setRentStartDate(Date.parse(String(date)));
  }

  handleSubmit() {
    console.log(this.props);
    console.log(this.state);
    this.props.navigator.push({
      screen: 'seker.RentToolEndDateScreen',
      title: 'Rent Tool',
      backButtonTitle: 'Back',
      passProps: this.props
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>{`Rent: ${this.props.title}`}</Text>
        </View>
        <FormLabel>Enter Start Date</FormLabel>
        <CalendarPicker onDateChange={this.onDateChange.bind(this)} />
        <View>
          <Text>
            Selected Start Date:{this.props.rentDates.startDate
              ? '  ' +
                new Date(this.props.rentDates.startDate).toLocaleDateString()
              : ''}
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Select Start Date"
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

function mapStateToProps(state) {
  return { rentDates: state.rentDates };
}

export default connect(
  mapStateToProps,
  actions
)(RentToolStartDateScreen);
