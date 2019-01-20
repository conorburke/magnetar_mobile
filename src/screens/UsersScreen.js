import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { FormInput, FormLabel, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import * as actions from '../actions';
import User from '../components/User';

class UsersScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = { UserName: '' };

  componentDidMount() {
    this.props.fetchUsers();
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'SideDrawerScreenToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        });
      }
    }
    if (event.type === 'DeepLink') {
      const parts = event.link;
      if (parts === 'WelcomeScreen') {
        this.props.navigator.resetTo({
          screen: 'seker.WelcomeScreen',
          title: 'Seker'
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FormLabel style={styles.font}>Find User</FormLabel>
          {/* <FormInput
            containerStyle={styles.font}
            value={this.state.UserName}
            onChangeText={text => {
              this.props.filterUsers(text);
            }}
          /> */}
          <SearchBar
            round
            lightTheme
            containerStyle={{ backgroundColor: '#f5f5f5' }}
            inputStyle={{ backgroundColor: 'white' }}
            value={this.state.UserName}
            onChangeText={text => {
              window.console.log('text', text);
              this.props.filterUsers(text);
            }}
            placeholder="Enter User Name..."
            style={{ width: 200 }}
          />
        </View>
        <FlatList
          data={this.props.users.filter(
            u =>
              u.first_name
                .toLowerCase()
                .includes(this.props.userFilter.toLowerCase().trim()) ||
              u.last_name
                .toLowerCase()
                .includes(this.props.userFilter.toLowerCase().trim())
          )}
          renderItem={({ item }) => {
            return <User user={item} navigator={this.props.navigator} />;
          }}
          keyExtractor={item => {
            let key;
            item.ID
              ? (key = item.ID.toString())
              : (key = Math.random().toString());
            return key;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fontType: {
    fontFamily: 'Futura-Medium',
    fontSize: 22
  }
});

function mapStateToProps(state) {
  return {
    userFilter: state.users.usersSearch,
    users: state.users.usersList
  };
}

export default connect(
  mapStateToProps,
  actions
)(UsersScreen);
