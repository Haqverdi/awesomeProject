import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';

class Profil extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed() {
    Navigation.dismissModal(this.props.componentId);
  }

  render() {
    const { profil } = this.props;
    if (typeof profil == 'object') {
      return (
        <View style={styles.container}>
          {Object.keys(profil).map((el, index) => {
            return (
              <Text key={el + index}>
                {el}: {profil[el] != null ? profil[el] : 'Teyin olunmuyub'}
              </Text>
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Text>Məlumat yoxdur.</Text>
        </View>
      );
    }
  }
}

Profil.propTypes = {
  profil: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Profil;
