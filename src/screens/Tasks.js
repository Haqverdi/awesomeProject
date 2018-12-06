import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, TouchableOpacity, Text } from 'react-native';
import { Container, Content, Fab, View, Icon } from 'native-base';
import Card from '../components/Card';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get_dashboard_info } from '../redux/actions/index';

const mapStateToProps = state => ({
  token: state.token,
  dashboardError: state.dashboardError,
  dashboard: state.dashboard,
});

const mapDispatchToProps = dispatch => {
  return {
    get_dashboard_info: () => dispatch(get_dashboard_info()),
  };
};

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
    this.loadDashboard = this.loadDashboard.bind(this);
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
    this.loadDashboard();
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

  loadDashboard = async () => {
    get_dashboard_info();
    // try {
    // } catch (error) {
    //   alert(error);
    // }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          {/* {this.state.tasks.map((el, index) => {
            return <Card key={index} task={el} />;
          })} */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>
              {this.props.dashboard != null
                ? this.props.dashboard.defaults.currencies.main
                : 'Not found'}
            </Text>
          </View>
          <TouchableOpacity onPress={this.loadDashboard}>
            <View>
              <Text>Load data</Text>
            </View>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
});
