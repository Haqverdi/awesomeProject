import React, { Component } from 'react';
import { Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { getToken } from '../../redux/actions/index';
import { goLogin } from '../../navigations';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
      await this.props.getToken('');
      goLogin();
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <TouchableOpacity style={{ width: '100%' }}>
        <Button block danger onPress={this.handleLogout}>
          <Text style={{ color: 'white', fontSize: 16 }}>
            {this.props.text}
          </Text>
        </Button>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getToken: token => dispatch(getToken(token)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
