import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ToolDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>{this.props.toolDetails.Title}</Text>
        </View>
        <View>
          <Text style={styles.detailFont}>{this.props.toolDetails.Title}</Text>
          <Text style={styles.detailFont}>
            {this.props.toolDetails.ToolType}
          </Text>
          <Text style={styles.detailFont}>
            {'$' + this.props.toolDetails.Price}
          </Text>
          <Text style={styles.detailFont}>
            {this.props.toolDetails.FirstName}
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
    color: '#F5F5F5',
    fontSize: 15
  },
  header: {
    color: 'silver',
    fontSize: 30
  }
});

export default ToolDetail;
