import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import CalendarPicker from 'react-native-calendar-picker';

import * as actions from '../actions';

class RentToolEndDateScreen extends Component {
  onDateChange(date) {
    this.props.setRentEndDate(Date.parse(String(date)));
  }

  handleSubmit() {
    this.props.navigator.push({
      screen: 'seker.RentToolConfirmScreen',
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
        <FormLabel>Enter End Date</FormLabel>
        <CalendarPicker onDateChange={this.onDateChange.bind(this)} />
        <View>
          <Text>
            Selected End Date:{this.props.rentDates.endDate
              ? '  ' +
                new Date(this.props.rentDates.endDate).toLocaleDateString()
              : ''}
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Select End Date"
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
)(RentToolEndDateScreen);
