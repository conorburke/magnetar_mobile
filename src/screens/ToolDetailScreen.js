import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../actions';
import ToolDetail from '../components/ToolDetail';

class ToolDetailScreen extends Component {
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
        <ToolDetail
          toolDetails={this.props.tool.data ? this.props.tool.data.tool : {}}
        />
        <View style={styles.button}>
          <Button
            title="Rent Tool"
            backgroundColor="#e4000f"
            rounded={true}
            raised={true}
            fontSize={22}
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
    backgroundColor: '#f5f5f5',
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
