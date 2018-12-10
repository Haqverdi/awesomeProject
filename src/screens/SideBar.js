import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logout from './sidemenu/Logout';
import LoadPersonalInfo from './sidemenu/LoadPersonalInfo';
import { get_personal_info, get_companies_list } from '../redux/actions/index';
import { Navigation } from 'react-native-navigation';
import { showCustomModal } from '../navigations';

const mapDispatchToProps = dispatch => {
  return {
    get_personal_info: () => dispatch(get_personal_info()),
    get_companies_list: () => dispatch(get_companies_list()),
  };
};

const mapStateToProps = state => ({
  personaInfo: state.personaInfo,
  companies: state.companies,
});

class SideBar extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.handleLoadInfo = this.handleLoadInfo.bind(this);
  }

  static propTypes = {
    get_personal_info: PropTypes.func,
    get_companies_list: PropTypes.func,
    personaInfo: PropTypes.object,
    companies: PropTypes.array,
  };

  handleLoadInfo = async () => {
    try {
      if (!this.props.personaInfo || !this.props.companies) {
        await this.props.get_personal_info();
        await this.props.get_companies_list();
      }
      showCustomModal('Profil', 'Profil', {
        profil: this.props.personaInfo,
        companies: this.props.companies,
      });
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <List>
            <ListItem>
              <Text style={styles.welcome}>Welcome to Prospect SMB!</Text>
            </ListItem>
            <ListItem>
              <Text style={styles.instructions}>There will be menu</Text>
            </ListItem>
            <ListItem>
              <LoadPersonalInfo text="Profil" onClick={this.handleLoadInfo} />
            </ListItem>
            <ListItem>
              <Logout text="Logout" />
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
// export default SideBar;
