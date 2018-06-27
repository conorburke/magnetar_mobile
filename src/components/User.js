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
      <View style={styles.container}>
        <TouchableOpacity onPress={this.openUserDetail.bind(this)}>
          <Text style={styles.titleFont}>
            {this.props.user.FirstName + ' ' + this.props.user.LastName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: 5,
    margin: 5,
    backgroundColor: '#666666',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#DDD',
    position: 'relative',
    // width: '90%',
    borderRadius: 10
  },
  titleFont: {
    color: '#F5F5F5',
    fontSize: 25
  }
});

export default User;
