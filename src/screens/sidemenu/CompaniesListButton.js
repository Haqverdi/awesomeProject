import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import PropTypes from 'prop-types';

const CompaniesListButton = ({ onClick, text }) => {
  return (
    <TouchableOpacity style={{ width: '100%' }}>
      <Button block warning onPress={onClick}>
        <Text style={{ color: 'white', fontSize: 16 }}>{text}</Text>
      </Button>
    </TouchableOpacity>
  );
};

CompaniesListButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default CompaniesListButton;
