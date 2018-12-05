import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    backgroundColor: '#4CAC85',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
});

Header.propTypes = {
  title: PropTypes.string,
};
