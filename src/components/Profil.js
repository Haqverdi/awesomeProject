import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';

class Profil extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    Navigation.dismissModal(this.props.componentId);
  }

  render() {
    const { profil } = this.props;
    if (typeof profil == 'object') {
      return (
        <View>
          {Object.keys(profil).map((el, index) => {
            return (
              profil[el] != null && (
                <Text key={el + index}>
                  {el}: {profil[el]}
                </Text>
              )
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Text>Melumat yoxdur.</Text>
        </View>
      );
    }
  }
}

Profil.propTypes = {
  profil: PropTypes.object,
};

export default Profil;
