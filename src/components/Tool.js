import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import * as actions from '../actions';

class Tool extends Component {
  openToolDetail() {
    this.props.navigator.push({
      screen: 'seker.ToolDetailScreen',
      title: 'Tool Detail',
      backButtonTitle: 'Back to Tools',
      passProps: this.props.tool
    });
  }

  handleDelete(id) {
    alert(`id to delete is ${id}`);
    this.props.deleteTool(id);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.openToolDetail.bind(this)}>
          <Text style={styles.titleFont}>{this.props.tool.title}</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailFont}>
              {`Cost: $${this.props.tool.price} `}
            </Text>
            <Text style={styles.detailFont}>
              {` Type: ${this.props.tool.category} `}
            </Text>
            <Text style={styles.detailFont}>
              {` Owner: ${this.props.tool.depot.owner.first_name || ''}`}
            </Text>
          </View>
        </TouchableOpacity>
        {/* {this.props.profile.ID == this.props.tool.ToolOwner ?
          <TouchableOpacity>
            <Icon onPress={() => this.handleDelete(this.props.tool.ID)} size={30} name='ios-trash' color='red'/>
          </TouchableOpacity>
        : null }
        }  */}
      </View>
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
    borderRadius: 10
  },
  titleFont: {
    color: '#e4000f',
    fontSize: 25
  },
  detailFont: {
    color: '#e4000f',
    fontSize: 15
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

function mapStateToProps(state) {
  return { profile: state.profile };
}

export default connect(
  mapStateToProps,
  actions
)(Tool);
