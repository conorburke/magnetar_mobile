import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';

class Tools extends Component {
  render() {
    // return <FlatList
    //   data={this.props.tools.length > 0 ? this.props.tools : []}
    //   renderItem={item => <View>item.Name</View>}  
    // />
  }
}

function mapStateToProps(state) {
  return { tools: state.tools };
}

export default connect(mapStateToProps)(Tools);