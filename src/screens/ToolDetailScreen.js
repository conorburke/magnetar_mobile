import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class ToolDetailScreen extends Component {
  render() {
    console.log('insiddddddddeeee', this.props);
    return (
      <TouchableOpacity>
        <View>
          <Text>{this.props.Title}</Text>
          <Text>{this.props.ToolType}</Text>
          <Text>{this.props.Price}</Text>
          <Icon size={30} name='ios-trash' color='red'/>
        </View>
      </TouchableOpacity>
    )
  }
}

export default ToolDetailScreen;