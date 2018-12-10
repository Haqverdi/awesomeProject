import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';

class Companies extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed() {
    Navigation.dismissModal(this.props.componentId);
  }

  render() {
    const { companies } = this.props;
    const listOfCompanies = companies.map((company, index) => (
      <View key={index + 'id'} style={styles.container}>
        {Object.keys(company).map((el, index) => {
          return (
            <Text key={el + index}>
              {el}: {company[el] != null ? company[el] : 'Teyin olunmuyub'}
            </Text>
          );
        })}
      </View>
    ));
    const noInfo = () => (
      <View>
        <Text>Məlumat yoxdur.</Text>
      </View>
    );
    return companies ? listOfCompanies : noInfo;
  }
}

Companies.propTypes = {
  companies: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Companies;
