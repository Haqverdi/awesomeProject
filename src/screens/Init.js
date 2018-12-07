import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Animated,
  PermissionsAndroid,
  AsyncStorage,
} from 'react-native';
import { Icon } from 'native-base';
import { goTasks, goLogin } from '../navigations';
import { connect } from 'react-redux';
import { getToken, get_dashboard_info } from '../redux/actions/index';

const mapStateToProps = state => ({
  dashboard: state.dashboard,
});

const mapDispatchToProps = dispatch => {
  return {
    getToken: token => dispatch(getToken(token)),
    get_dashboard_info: () => dispatch(get_dashboard_info()),
  };
};

class Init extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
      loading: true,
    };
    this.loadingAnimation = this.loadingAnimation.bind(this);
    // this.requestForWrite = this.requestForWrite.bind(this);
    this.checkToken = this.checkToken.bind(this);
  }

  componentDidMount = () => {
    this.loadingAnimation();
    // this.requestForWrite();
    this.checkToken();
  };

  checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      if (token !== null) {
        await this.props.getToken(token);
        if (this.props.dashboard == null) {
          await this.props.get_dashboard_info();
          goTasks();
        }
      } else {
        goLogin();
      }
    } catch (error) {
      alert(error);
    }
  };

  // requestForWrite = async () => {
  //   try {
  //     const grantedWriteStorage = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: 'Prospect app WRITE permission',
  //         message: 'To write data we need your agree',
  //       }
  //     );
  //     if (grantedWriteStorage === PermissionsAndroid.RESULTS.GRANTED) {
  //       await AsyncStorage.setItem('WRITE_ACCESS', 'true');
  //     } else {
  //       await AsyncStorage.setItem('WRITE_ACCESS', 'false');
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  loadingAnimation = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 2000,
    }).start(() => {
      this.state.animatedValue.setValue(0);
      this.loadingAnimation();
    });
  };

  render() {
    const interpolateRotation = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const animatedStyle = {
      transform: [{ rotate: interpolateRotation }],
    };

    return (
      <View style={styles.container}>
        <Text style={styles.text}> Loading </Text>
        <Animated.View style={animatedStyle}>
          <Icon
            style={styles.icon}
            name="spinner"
            size={20}
            type="FontAwesome"
          />
        </Animated.View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Init);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
  },
});
