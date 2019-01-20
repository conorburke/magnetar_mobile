import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import * as actions from '../actions';
import Tool from '../components/Tool';

class UserToolsScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.props.fetchProfile(this.props.profile.id);
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

  flattenTools = () => {
    let flatTools = [];
    if (this.props.profile.depots && this.props.profile.depots.length > 0) {
      this.props.profile.depots.forEach(depot => {
        console.log(depot);
        depot.tools.forEach(tool => {
          flatTools.push(tool);
        });
      });
    }
    return flatTools;
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.flattenTools()}
          renderItem={({ item }) => {
            return <Tool tool={item} navigator={this.props.navigator} />;
          }}
          keyExtractor={item => {
            let key;
            item.ID
              ? (key = item.id.toString())
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
  }
});

function mapStateToProps(state) {
  return {
    profile: state.profile,
    userTools: state.userTools
  };
}

export default connect(
  mapStateToProps,
  actions
)(UserToolsScreen);
