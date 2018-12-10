import React, { Component } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { Container, Content, Fab, View, Icon } from 'native-base';
import Card from '../components/Card';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  get_dashboard_info,
  convert_dahsboard_currencies_to,
  get_personal_info,
  get_companies_list,
} from '../redux/actions/index';
import { showExpenses } from '../navigations';
import CurrencyForm from '../components/CurrencyFrom';
import CurrencyList from '../components/CurrencyList';

const mapStateToProps = state => ({
  token: state.token,
  dashboardError: state.dashboardError,
  dashboard: state.dashboard,
  personaInfo: state.personaInfo,
  companies: state.companies,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        get_dashboard_info,
        convert_dahsboard_currencies_to,
        get_personal_info,
        get_companies_list,
      },
      dispatch
    ),
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
      selected:
        this.props.dashboard !== null
          ? this.props.dashboard.defaults.currencies.main
          : 551,
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

  // componentDidMount = async () => {
  //   if (!this.props.personaInfo || !this.props.companies) {
  //     await this.props.get_personal_info();
  //     await this.props.get_companies_list();
  //   }
  //   showCustomModal('Profil', 'Profil', {
  //     profil: this.props.personaInfo,
  //     companies: this.props.companies,
  //   });
  // };

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

  handleRefresh = async () => {
    await this.props.get_dashboard_info();
    await this.props.get_companies_list();
    await this.props.get_personal_info();
    this.setState({
      refreshing: false,
    });
  };

  async onValueChange(value) {
    await this.props.convert_dahsboard_currencies_to(value);
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
          <CurrencyList
            data={this.props.dashboard}
            currentCurrency={
              this.props.dashboard.defaults.currencies.currencies[
                this.state.selected
              ]
            }
            showExpenses={() => showExpenses(this.props.dashboard.expenses)}
          />
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
