import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import * as actions from '../actions';

class ToolDetailScreen extends Component {
  componentDidMount() {
    this.props.fetchTool(this.props.ID);
  }

  render() {
    return (
      <TouchableOpacity>
        <View>
          <Text>{this.props.ID}</Text>
          <Text>{this.props.Title}</Text>
          <Text>{this.props.ToolType}</Text>
          <Text>{this.props.Price}</Text>
          <Text>{this.props.ToolOwner}</Text>
          <Icon size={30} name='ios-trash' color='red'/>
          <Text>{this.props.tool.ToolType}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

function mapStateToProps(state) {
  return { tool: state.tool };
}

export default connect(mapStateToProps, actions)(ToolDetailScreen);