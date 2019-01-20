import React, { Component } from 'react';
import { AsyncStorage, Image, Text, View, StyleSheet } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { Switch } from 'react-native-switch';
import { connect } from 'react-redux';
import axios from 'axios';
import querystring from 'querystring';

import * as actions from '../actions';
import startMainTabs from '../screens/startMainTabs';

const rootUrl = 'http://localhost:7777';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    register: false,
    passwordsDiff: true
  };

  handleRegister() {
    this.props.setEmail(this.state.email);
    axios
      .post(
        `${rootUrl}/register`,
        querystring.stringify({
          email: this.state.email,
          password: this.state.password
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(({ data }) => {
        console.log(data);
        // firebase.auth().signInWithCustomToken(data.token);
        this.props.authUser(data.email);
        // startMainTabs();
        this.props.navigator.push({
          screen: 'seker.CreateProfileScreen',
          title: 'Create Profile',
          backButtonTitle: 'Back to Home'
        });
      })
      .catch(err => console.log(err));
  }

  handleLogin() {
    this.props.setEmail(this.state.email);
    axios
      .post(
        `${rootUrl}/signin`,
        querystring.stringify({
          email: this.state.email,
          password: this.state.password
        }),
        {
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(({ data }) => {
        console.log('response data login', data);
        // firebase.auth().signInWithCustomToken(data.token);
        this.props.authUser(data.email);
        this.props.setProfile(data);
        AsyncStorage.setItem('auth_email', data.email.toString());
        AsyncStorage.setItem('profile_id', data.id.toString());
        startMainTabs();
        // this.props.navigator.push({
        //   screen: 'seker.ToolsScreen',
        //   title: 'Tools',
        //   backButtonTitle: 'Back to Home'
        // });
      })
      .catch(err => console.log(err));
  }

  showSignIn() {
    return (
      <View>
        <View style={styles.container}>
          <FormLabel>Enter Email</FormLabel>
          <FormInput
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.container}>
          <FormLabel>Enter Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </View>
        <Button
          title="Log In"
          backgroundColor="#e4000f"
          rounded={true}
          raised={true}
          fontSize={22}
          onPress={this.handleLogin.bind(this)}
        />
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20
          }}
        >
          <Image
            source={require('../images/blacksmith.png')}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </View>
    );
  }

  checkButtonDisabled() {
    if (
      this.state.password === this.state.passwordConfirmation &&
      this.state.password.length > 7 &&
      this.state.email.includes('@') &&
      this.state.email.includes('.')
    ) {
      this.setState({ passwordsDiff: false });
    } else {
      this.setState({ passwordsDiff: true });
    }
  }

  showRegister() {
    return (
      <View>
        <View style={styles.container}>
          <FormLabel>Enter Email</FormLabel>
          <FormInput
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            onSelectionChange={this.checkButtonDisabled.bind(this)}
          />
        </View>
        <View style={styles.container}>
          <FormLabel>Enter Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => {
              this.setState({ password });
            }}
            onSelectionChange={this.checkButtonDisabled.bind(this)}
          />
        </View>
        <View style={styles.container}>
          <FormLabel>Confirm Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            value={this.state.passwordConfirmation}
            onChangeText={passwordConfirmation => {
              this.setState({ passwordConfirmation });
            }}
            onSelectionChange={this.checkButtonDisabled.bind(this)}
          />
        </View>
        <Button
          style={styles.container}
          title="Register"
          backgroundColor="#e4000f"
          rounded={true}
          raised={true}
          fontSize={22}
          onPress={this.handleRegister.bind(this)}
          disabled={this.state.passwordsDiff}
          // disabledStyle={{borderColor: 'green'}}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          {this.state.register ? <Text>Register</Text> : <Text>Log In</Text>}
          <Switch
            value={this.state.register}
            onValueChange={register => this.setState({ register })}
            backgroundActive={'#a9a9a9'}
            backgroundInactive={'#a9a9a9'}
            circleActiveColor={'#e4000f'}
            circleInActiveColor={'#e4000f'}
            circleSize={30}
            barHeight={30}
            circleBorderWidth={0}
          />
        </View>
        {this.state.register ? (
          <View>{this.showRegister()}</View>
        ) : (
          <View>{this.showSignIn()}</View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
    fontSize: 22
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e4000f',
    fontFamily: 'Futura'
  },
  container: {
    marginBottom: 20
  }
});

export default connect(
  null,
  actions
)(SignIn);
