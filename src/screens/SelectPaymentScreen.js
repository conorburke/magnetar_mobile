import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import stripe from 'tipsi-stripe';
import querystring from 'querystring';

import { STRIPE_PUBLISH_KEY } from '../../keys';
import * as actions from '../actions';
import { addRentedTool } from './mutations';
import startMainTabs from './startMainTabs';
import url from '../utils';

class SelectPaymentScreen extends Component {
  state = {
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCsv: '',
    cardType: '',
    lastFour: '',
    paymentMethodConfirmed: false,
    stripeToken: ''
  };

  componentDidMount() {
    stripe.setOptions({
      publishableKey: STRIPE_PUBLISH_KEY,
      // merchantId: 'MERCHANT_ID', // Optional
      androidPayMode: 'test' // Android only
    });
  }

  selectPayment() {
    const options = {
      smsAutofillDisabled: true,
      requiredBillingAddressFields: 'zip'
    };
    stripe
      .paymentRequestWithCardForm(options)
      .then(res => {
        console.log(res);
        this.setState({
          cardType: res.card.brand,
          lastFour: res.card.last4,
          paymentMethodConfirmed: true,
          stripeToken: res.tokenId
        });
        console.log(this.state);

        // Get the token from the response, and send to your server
      })
      .catch(err => {
        console.log(err);
        // Handle error
      });
  }

  confirmRental() {
    const { tool } = this.props.tool.data;
    const { endDate, startDate } = this.props.rentDates;

    axios
      .post(`${url.api}/oracle`, {
        query: addRentedTool,
        variables: {
          toolID: tool.id,
          startDate,
          endDate,
          renterID: this.props.profile.id,
          ownerID: tool.depot.owner_id
        }
      })
      .then(res => {
        console.log(res);
        let dateStart = this.props.rentDates.startDate;
        let dateEnd = this.props.rentDates.endDate;
        let dateDiff = moment(dateEnd).diff(moment(dateStart), 'days') + 1;
        axios
          .post(
            `${url.api}/api/payment`,
            querystring.stringify({
              price:
                Number(this.props.tool.data.tool.price) *
                Number(dateDiff) *
                100,
              stripeToken: this.state.stripeToken
            }),
            {
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
          .catch(err => console.log('srtripe api payment error', err));
        startMainTabs();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let dateStart = this.props.rentDates.startDate;
    let dateEnd = this.props.rentDates.endDate;
    let dateDiff = moment(dateEnd).diff(moment(dateStart), 'days') + 1;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Rental Details</Text>
        <Text style={styles.miniHeader}>Total Cost</Text>
        <Text style={styles.textInfo}>
          {'$' + Number(this.props.tool.data.tool.price) * Number(dateDiff)}
        </Text>
        <View style={styles.button}>
          <Button
            title="Select Payment"
            backgroundColor="#e4000f"
            rounded={true}
            raised={true}
            fontSize={22}
            onPress={this.selectPayment.bind(this)}
          />
        </View>
        <Text style={styles.miniHeader}>Card Type</Text>
        <Text style={styles.textInfo}>{this.state.cardType}</Text>
        <Text style={styles.miniHeader}>Last 4 of Card</Text>
        <Text style={styles.textInfo}>{this.state.lastFour}</Text>
        <View style={styles.button}>
          <Button
            title="Confirm Rental"
            backgroundColor="#e4000f"
            rounded={true}
            raised={true}
            fontSize={22}
            onPress={this.confirmRental.bind(this)}
            disabled={!this.state.paymentMethodConfirmed}
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
  },
  miniHeader: {
    fontSize: 26,
    textDecorationLine: 'underline'
  },
  textInfo: {
    fontSize: 22
  },
  divider: {
    margin: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

function mapStateToProps(state) {
  return { profile: state.profile, rentDates: state.rentDates };
}

export default connect(
  mapStateToProps,
  actions
)(SelectPaymentScreen);
