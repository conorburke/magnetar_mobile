import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class UserDetailScreen extends Component {
  render() {
    return (
      <TouchableOpacity>
        <View>
          <Text>{this.props.FirstName + ' ' + this.props.LastName}</Text>
          <Text>{this.props.Email}</Text>
          <Text>{this.props.PhoneNumber}</Text>
          <Icon size={30} name="ios-trash" color="red" />
        </View>
      </TouchableOpacity>
    );
  }
}

export default UserDetailScreen;
