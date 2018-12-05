import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logout from './sidemenu/Logout';
import LoadPersonalInfo from './sidemenu/LoadPersonalInfo';
import { get_personal_info } from '../redux/actions/index';
import { Navigation } from 'react-native-navigation';

const mapDispatchToProps = dispatch => {
  return {
    get_personal_info: () => dispatch(get_personal_info()),
  };
};

const mapStateToProps = state => ({
  personaInfo: state.personaInfo,
});

class SideBar extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.handleLoadInfo = this.handleLoadInfo.bind(this);
  }

  static propTypes = {
    get_personal_info: PropTypes.func,
    personaInfo: PropTypes.object,
  };

  handleLoadInfo = async () => {
    try {
      await this.props.get_personal_info();
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: false,
          },
        },
      });
      Navigation.showModal({
        stack: {
          children: [
            {
              component: {
                name: 'Profil',
                id: 'Profil',
                passProps: {
                  profil: this.props.personaInfo,
                },
                options: {
                  topBar: {
                    background: {
                      color: '#4CAC85',
                    },
                    title: {
                      component: {
                        name: 'Header',
                        passProps: {
                          title: 'Profil',
                        },
                        alignment: 'center',
                      },
                    },
                    leftButtons: [
                      {
                        icon: require('../assets/left-icon.svg'),
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
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
              <LoadPersonalInfo
                text="Profil"
                LoadInfoFunc={this.handleLoadInfo}
              />
            </ListItem>
            <ListItem>
              <Logout />
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
