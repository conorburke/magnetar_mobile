import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import stripe from 'tipsi-stripe';

import { STRIPE_PUBLISH_KEY } from '../../keys';

class CreateCreditCardScreen extends Component {
  state = { cardNumber: '', cardMonth: '', cardYear: '', cardCsv: '' };

  componentDidMount() {
    stripe.setOptions({
      publishableKey: STRIPE_PUBLISH_KEY,
      // merchantId: 'MERCHANT_ID', // Optional
      androidPayMode: 'test' // Android only
    });
  }

  async submitCardInfo() {
    const params = {
      // mandatory
      number: this.state.cardNumber,
      expMonth: parseInt(this.state.cardMonth),
      expYear: parseInt(this.state.cardYear),
      cvc: this.state.cardCsv,
      // optional
      currency: 'usd'
    };

    // stripe.createTokenWithCard(params)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    console.log('button pressed');
    const token = await stripe.createTokenWithCard(params);

    console.log(token);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FormLabel>Card Number</FormLabel>
          <FormInput
            value={this.state.cardNumber}
            onChangeText={cardNumber => this.setState({ cardNumber })}
          />
        </View>
        <View>
          <FormLabel>Card Month</FormLabel>
          <FormInput
            value={this.state.cardMonth}
            onChangeText={cardMonth => this.setState({ cardMonth })}
          />
        </View>
        <View>
          <FormLabel>Card Year</FormLabel>
          <FormInput
            value={this.state.cardYear}
            onChangeText={cardYear => this.setState({ cardYear })}
          />
        </View>
        <View>
          <FormLabel>Card CSV</FormLabel>
          <FormInput
            value={this.state.cardCsv}
            onChangeText={cardCsv => this.setState({ cardCsv })}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Set Card"
            backgroundColor="#e4000f"
            rounded={true}
            raised={true}
            fontSize={22}
            onPress={this.submitCardInfo.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

function mapStateToProps(state) {
  return { profile: state.profile };
}

export default connect(
  mapStateToProps,
  null
)(CreateCreditCardScreen);
