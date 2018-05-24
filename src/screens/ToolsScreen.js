import React, { Component } from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import * as actions from '../actions';
import Tool from '../components/Tool';

class ToolsScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    console.log('auth', this.props.auth);
    console.log('component mounted');
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
      // if (parts === 'WelcomeScreen') {
      //   this.props.navigator.push({
      //     screen: 'seker.WelcomeScreen',
      //     title: 'Seker'
      //   })
      // }
      this.props.navigator.resetTo({
        screen: 'seker.WelcomeScreen',
        title: 'Seker'
      })
      // Navigation.startSingleScreenApp({
      //   screen: {
      //     screen: 'seker.WelcomeScreen',
      //     title: 'Seker'
      //   }
      // });
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
        <Text>Tools for you!</Text>
        <FlatList
          data={this.props.tools}
          // data={this.props.tools.length > 0 ? this.props.tools : [{ToolType: 'loading'}]}
          renderItem={({item}) => {
              // console.log('item', item);
              return <Tool tool={item} navigator={this.props.navigator}/>
              // return <TouchableOpacity><Icon size={30} name='ios-trash' color='red'/><View><Text>{item.ToolType}</Text></View></TouchableOpacity>;
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
        <TouchableOpacity>
          <Button 
            title='Log Out'
            onPress={this.handleSubmit.bind(this)}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return { 
    tools: state.tools,
    auth: state.auth
  
  };
}

export default connect(mapStateToProps, actions)(ToolsScreen);