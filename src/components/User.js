import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
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
      <TouchableOpacity>
        <View style={styles.containerStyle}>
          <Text onPress={this.openUserDetail.bind(this)}>{this.props.user.FirstName}</Text>
          <Icon size={30} name='ios-trash' color='red' onPress={() => Alert.alert('Delete pushed!')}/>
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

export default User;