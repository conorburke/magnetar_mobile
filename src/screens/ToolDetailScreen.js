import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../actions';
import ToolDetail from '../components/ToolDetail';

class ToolDetailScreen extends Component {
  componentDidMount() {
    this.props.fetchTool(this.props.ID);
  }

  openRentToolScreen() {
    this.props.navigator.push({
      screen: 'seker.RentToolScreen',
      title: 'Rent Tool',
      backButtonTitle: 'Back to Tool',
      passProps: this.props
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolDetail toolDetails={this.props} />
        <View style={styles.button}>
          <Button
            title="Rent Tool"
            backgroundColor="#3F3F3F"
            onPress={this.openRentToolScreen.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 5
  },
  container: {
    backgroundColor: '#003B59',
    flex: 1
  }
});

function mapStateToProps(state) {
  return { tool: state.tool };
}

export default connect(
  mapStateToProps,
  actions
)(ToolDetailScreen);
