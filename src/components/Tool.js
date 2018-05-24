import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import * as actions from '../actions';

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

  handleDelete(id) {
    alert(`id to delete is ${id}`);
    this.props.deleteTool(id);
  }

  render() {
    console.log('propssss', this.props);
    console.log('navigator', this.props.navigator);
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity>
          <Text onPress={this.openToolDetail.bind(this)}>{this.props.tool.Title}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon onPress={() => this.handleDelete(this.props.tool.ID)} size={30} name='ios-trash' color='red'/>
        </TouchableOpacity>
      </View>
      
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

export default connect(null, actions)(Tool);