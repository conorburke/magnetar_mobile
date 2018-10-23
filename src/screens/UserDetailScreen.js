import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class UserDetailScreen extends Component {
  render() {
    return (
      <TouchableOpacity>
        <View>
          <Text>{this.props.first_name + ' ' + this.props.last_name}</Text>
          <Text>{this.props.email}</Text>
          <Text>{this.props.phone_number}</Text>
          <Icon size={30} name="ios-trash" color="red" />
        </View>
      </TouchableOpacity>
    );
  }
}

export default UserDetailScreen;
