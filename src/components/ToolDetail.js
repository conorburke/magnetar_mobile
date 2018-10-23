import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ToolDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>{this.props.toolDetails.title}</Text>
        </View>
        <View>
          <Text style={styles.detailFont}>{this.props.toolDetails.title}</Text>
          <Text style={styles.detailFont}>
            {this.props.toolDetails.category}
          </Text>
          <Text style={styles.detailFont}>
            {'$' + this.props.toolDetails.price}
          </Text>
          <Text style={styles.detailFont}>
            {this.props.toolDetails.first_name}
          </Text>
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
  }
});

export default ToolDetail;
