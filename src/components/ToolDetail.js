import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

class ToolDetail extends Component {
  comonentDidMount() {
    console.log('tool detail props', this.props);
  }

  render() {
    console.log('this.props.toolDetails', this.props.toolDetails);
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>{this.props.toolDetails.title}</Text>
        </View>
        <Image
          source={
            this.props.toolDetails.tool_pictures &&
            this.props.toolDetails.tool_pictures.length > 0
              ? { uri: this.props.toolDetails.tool_pictures[0].image }
              : null
          }
          style={styles.previewImage}
        />
        <View>
          <Text style={styles.detailFont}>
            Price / Day: {'$' + this.props.toolDetails.price}
          </Text>
          <Text style={styles.detailFont}>
            Category: {this.props.toolDetails.category}
          </Text>
          <Text style={styles.detailFont}>
            Description: {this.props.toolDetails.description}
          </Text>
          {/* <Text style={styles.detailFont}>Owner: {this.props.depot.owner.first_name + ' ' + this.props.depot.owner.first_name}</Text> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  detailFont: {
    color: '#e4000f',
    fontSize: 15
  },
  header: {
    color: '#e4000f',
    fontSize: 30
  },
  previewImage: {
    width: 255,
    height: 255
  }
});

export default ToolDetail;
