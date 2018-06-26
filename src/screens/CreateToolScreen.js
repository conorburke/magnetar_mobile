import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';

import startMainTabs from '../screens/startMainTabs';
import url from '../utils';

class CreateToolScreen extends Component {
  state = {Title: '', ToolType: '', Price: '', PhoneNumber: ''};

  handleSubmit() {
    window.console.log('this.props.profile', this.props.profile);
    axios.post(`${url.api}/tools`, {Title: this.state.Title, ToolType: this.state.ToolType, Price: Number(this.state.Price), ToolOwner: this.props.profile.ID})
      .then(() => {
        console.log('created tool');
        this.props.fetchTools();
      })
      .catch(err => {
        console.log('current state', this.state);
        console.log(err)
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
          <FormLabel>Enter Tool Name</FormLabel>
          <FormInput 
            value={this.state.Title}
            onChangeText={Title => this.setState({Title})}
          />
        </View>
        <View>
          <FormLabel>Enter Tool Type</FormLabel>
          <FormInput 
            value={this.state.ToolType}
            onChangeText={ToolType => this.setState({ToolType})}
          />
        </View>
        <View>
          <FormLabel>Enter Price</FormLabel>
          <FormInput 
            value={this.state.Price}
            onChangeText={Price => this.setState({Price})}
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

function mapStateToProps(state) {
  return { profile: state.profile  };
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

export default connect(mapStateToProps, actions)(CreateToolScreen);