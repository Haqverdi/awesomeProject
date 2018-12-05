import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import PropTypes from 'prop-types';

const LoadPersonalInfo = ({ LoadInfoFunc, text }) => {
  return (
    <TouchableOpacity style={{ width: '100%' }}>
      <Button block warning onPress={LoadInfoFunc}>
        <Text style={{ color: 'white', fontSize: 16 }}>{text}</Text>
      </Button>
    </TouchableOpacity>
  );
};

LoadPersonalInfo.propTypes = {
  LoadInfoFunc: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default LoadPersonalInfo;
