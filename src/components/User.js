import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class User extends Component {
  openUserDetail() {
    this.props.navigator.push({
      screen: 'seker.UserDetailScreen',
      title: 'User Profile',
      backButtonTitle: 'Back to Users',
      passProps: this.props.user
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.openUserDetail.bind(this)}>
        <View style={styles.container}>
          <Text style={styles.titleFont}>
            {this.props.user.first_name + ' ' + this.props.user.last_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#e4000f',
    padding: 5,
    margin: 5,
    // justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'relative',
    // width: '90%',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  titleFont: {
    color: '#e4000f',
    fontSize: 25
  }
});

export default User;
