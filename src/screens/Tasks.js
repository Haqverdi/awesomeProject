import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';
import { Container, Content, Fab, View, Icon, Picker, Form } from 'native-base';
import Card from '../components/Card';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get_dashboard_info } from '../redux/actions/index';
import CurrencyForm from '../components/CurrencyFrom';
import CurrencyList from '../components/CurrencyList';

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
      refreshing: false,
      selected: this.props.dashboard.defaults.currencies.main,
    };

    Navigation.events().bindComponent(this);
    this.goToAddTaskPage = this.goToAddTaskPage.bind(this);
    this.loadDashboard = this.loadDashboard.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
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
    try {
      if (this.props.dashboard == null) {
        await this.props.get_dashboard_info();
      }
    } catch (error) {
      alert(error);
    }
  };

  handleRefresh = () => {
    this.loadDashboard();
    this.setState({
      refreshing: false,
    });
  };

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        {this.props.dashboard != null && (
          <CurrencyForm
            currencies={this.props.dashboard.defaults.currencies.currencies}
            selected={this.state.selected}
            onValueChange={this.onValueChange}
          />
        )}
        <Content
          padder
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
        >
          {/* {this.state.tasks.map((el, index) => {
            return <Card key={index} task={el} />;
          })} */}
          <View
            style={{ flex: 1, alignItems: 'center', backgroundColor: 'pink' }}
          >
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
          <CurrencyList />
          <View style={{ marginVertical: 40 }}>
            <Text>Load data</Text>
          </View>
          <View style={{ marginVertical: 40 }}>
            <Text>Load data</Text>
          </View>
          <View style={{ marginVertical: 40 }}>
            <Text>Load data</Text>
          </View>
          <View style={{ marginVertical: 40 }}>
            <Text>Load data</Text>
          </View>
          <View style={{ marginVertical: 40 }}>
            <Text>Load data</Text>
          </View>
          <View style={{ marginVertical: 40 }}>
            <Text>Load data</Text>
          </View>
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
