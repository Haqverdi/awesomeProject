import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class TaskInner extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.task.date}</Text>
        <Text>{this.props.task.title}</Text>
        <Text>{this.props.task.body}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
