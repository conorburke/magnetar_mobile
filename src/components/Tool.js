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
          <Text style={styles.titleFont}>{this.props.tool.Title}</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailFont}>
              {`Cost: $ ${this.props.tool.Price}`}
            </Text>
            <Text style={styles.detailFont}>
              {`Type: ${this.props.tool.ToolType}`}
            </Text>
            <Text style={styles.detailFont}>
              {`Owner: ${this.props.tool.FirstName} ${
                this.props.tool.LastName
              }`}
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
  },
  detailFont: {
    color: '#F5F5F5',
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
