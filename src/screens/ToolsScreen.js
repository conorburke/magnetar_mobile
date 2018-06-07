import React, { Component } from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/Ionicons';

import * as actions from '../actions';
import Tool from '../components/Tool';

class ToolsScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.props.fetchTools();
    AsyncStorage.getItem('profile_id')
        .then(res => {
          this.props.fetchProfile(res);
        })
  }

  componentDidUpdate() {
    this.props.fetchTools();
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

  handleSubmit() {
    AsyncStorage.removeItem('auth_token')
      .then(() =>     
        this.props.navigator.handleDeepLink({
          link: 'WelcomeScreen'
      }));
  }

  render() {
    console.log('tool screen props', this.props);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.tools}
          renderItem={({item}) => {
              return <Tool tool={item} navigator={this.props.navigator}/>
            }
          }  
          keyExtractor={item => {
              let key;
              // console.log(item);
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
    backgroundColor: '#C15000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return { 
    tools: state.tools,
    auth: state.auth,
    profile: state.profile
  
  };
}

export default connect(mapStateToProps, actions)(ToolsScreen);