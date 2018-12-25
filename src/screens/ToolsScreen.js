import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';

import * as actions from '../actions';
import Tool from '../components/Tool';

class ToolsScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = { ToolName: '' };

  componentDidMount() {
    this.props.fetchTools();
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
          <FormLabel>Find Tool</FormLabel>
          <FormInput
            containerStyle={styles.font}
            value={this.state.ToolName}
            onChangeText={text => {
              window.console.log('text', text);
              this.props.filterTools(text);
            }}
          />
        </View>
        <FlatList
          data={this.props.tools.filter(
            t =>
              t.title
                .toLowerCase()
                .includes(this.props.toolFilter.toLowerCase().trim()) ||
              t.category
                .toLowerCase()
                .includes(this.props.toolFilter.toLowerCase().trim())
          )}
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
  },
  fontType: {
    fontFamily: 'Futura-Medium',
    fontSize: 22
  }
});

function mapStateToProps(state) {
  return {
    toolFilter: state.tools.toolsSearch,
    tools: state.tools.toolsList,
    auth: state.auth,
    profile: state.profile
  };
}

export default connect(
  mapStateToProps,
  actions
)(ToolsScreen);
