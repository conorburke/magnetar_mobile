import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Tool extends Component {
  openToolDetail() {
    console.log('tools details props', this.props.tool);
    this.props.navigator.push({
      screen: 'seker.ToolDetailScreen',
      title: 'Tool Detail',
      backButtonTitle: 'Back to Tools',
      passProps: this.props.tool
    });
    // Alert.alert('Tapped Text!');
  }

  render() {
    console.log('propssss', this.props);
    console.log('navigator', this.props.navigator);
    return (
      <TouchableOpacity>
        <View style={styles.containerStyle}>
          <Text onPress={this.openToolDetail.bind(this)}>{this.props.tool.Title}</Text>
          <Icon size={30} name='ios-trash' color='red'/>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#DDD',
    position: 'relative',
    width: '75%'
  }
};

export default Tool;