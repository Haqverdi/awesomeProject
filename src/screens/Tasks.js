import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, TouchableOpacity, Text } from 'react-native';
import { Container, Content, Fab, View, Icon } from 'native-base';
import Card from '../components/Card';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get_personal_info } from '../redux/actions/index';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      showToast: false,
      p_info: {},
    };

    Navigation.events().bindComponent(this);
    this.goToAddTaskPage = this.goToAddTaskPage.bind(this);
    this.loadPersonalInfo = this.loadPersonalInfo.bind(this);
  }

  static propTypes = {
    componentId: PropTypes.string,
  };

  componentDidAppear = async () => {
    this.updateState();
  };

  updateState = async () => {
    try {
      const value = await AsyncStorage.getItem('TASKS');
      if (value !== null) {
        this.setState({
          tasks: JSON.parse(value),
        });
      }
    } catch (error) {
      this.setState({
        tasks: [],
      });
    }
  };

  componentDidMount = async () => {
    this.updateState();
    this.loadPersonalInfo();
  };

  goToAddTaskPage() {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'AddTask',
            },
          },
        ],
      },
    });
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'LeftMenuBtn') {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: true,
          },
        },
      });
    }
  }

  loadPersonalInfo = async () => {
    try {
      await this.props.get_personal_info();
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const { personaInfo } = this.props;
    return (
      <Container style={styles.container}>
        <Content padder>
          {/* {this.state.tasks.map((el, index) => {
            return <Card key={index} task={el} />;
          })} */}
          <TouchableOpacity onPress={this.loadPersonalInfo}>
            <Text>Load Info</Text>
          </TouchableOpacity>
        </Content>
        {/* Fab */}
        <View>
          <Fab
            style={{ backgroundColor: '#FFA02E' }}
            position="bottomRight"
            onPress={this.goToAddTaskPage}
          >
            <Icon name="plus" type="FontAwesome" />
          </Fab>
        </View>
        {/* Fab */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  personaInfo: state.personaInfo,
  personaInfoError: state.personaInfoError,
});

const mapDispatchToProps = dispatch => {
  return {
    get_personal_info: () => dispatch(get_personal_info()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
});
