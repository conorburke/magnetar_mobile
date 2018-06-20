import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import * as actions from '../actions';
import User from '../components/User';

class UsersScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'SideDrawerScreenToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        })
      }
    }
    if (event.type === 'DeepLink') {
      const parts = event.link;
      if (parts === 'WelcomeScreen') {
        this.props.navigator.resetTo({
          screen: 'seker.WelcomeScreen',
          title: 'Seker'
        })
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.users}
          renderItem={({item}) => {
              return <User user={item} navigator={this.props.navigator} /> // <TouchableOpacity><Icon size={30} name='ios-trash' color='red'/><View><Text>{item.FirstName}</Text></View></TouchableOpacity>;
            }
          }  
          keyExtractor={item => {
              let key;
              item.ID ? key = item.ID.toString() : key = Math.random().toString();
              return key;
            }
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003B59',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, actions)(UsersScreen);