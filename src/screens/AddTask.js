import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
} from 'react-native';
import { Container, Content, Input, Textarea, Icon } from 'native-base';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import moment from '../../node_modules/moment/src/moment';

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    Navigation.events().bindComponent(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveToAsyncStorage = this.saveToAsyncStorage.bind(this);
  }

  static propTypes = {
    componentId: PropTypes.string,
  };

  static get options() {
    return {
      topBar: {
        backButton: {
          color: 'white',
        },
        background: {
          color: '#4CAC85',
        },
        rightButtons: [
          {
            text: 'Təsdiq',
            color: 'white',
            id: 'save',
            enabled: false,
          },
        ],
        leftButtons: [
          {
            icon: require('../assets/left-icon.png'),
          },
        ],
        title: {
          component: {
            alignment: 'center',
            name: 'Header',
            passProps: {
              title: 'Yeni tapşırıq',
            },
          },
        },
      },
    };
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'save') {
      this.handleSubmit();
    } else {
      Keyboard.dismiss();
      Navigation.dismissModal(this.props.componentId);
    }
  }

  handleChange = (field, value) => {
    this.setState({
      [field]: value,
    });
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            text: 'Təsdiq',
            color: 'white',
            id: 'save',
            enabled: !!value,
          },
        ],
        leftButtons: [
          {
            color: 'white',
          },
        ],
      },
    });
  };

  saveToAsyncStorage = async () => {
    try {
      const prevValue = await AsyncStorage.getItem('TASKS');
      const date = moment().format('DD MMMM');
      const new_task = {
        date: date,
        title: this.state.title,
        body: this.state.body,
      };
      const parsedTasks = prevValue != null ? JSON.parse(prevValue) : [];
      const tasksForStore = [new_task, ...parsedTasks];
      await AsyncStorage.setItem('TASKS', JSON.stringify(tasksForStore));
    } catch (error) {
      alert(error);
    }
  };

  handleSubmit = () => {
    if (this.state.title !== '' && this.state.body !== '') {
      alert('Yadda saxlanıldı!');
      this.saveToAsyncStorage();
      setTimeout(() => {
        Navigation.dismissModal(this.props.componentId);
      }, 100);
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container style={styles.container}>
          <Content padder>
            <View style={styles.formContainer}>
              <View>
                <Text style={styles.label}>Başlıq</Text>
                <Input
                  style={styles.input}
                  autoFocus={true}
                  maxLength={150}
                  returnKeyType="next"
                  name="title"
                  onChangeText={text => {
                    this.handleChange('title', text);
                  }}
                  onSubmitEditing={() => this.refs.nextInput._root.focus()}
                />
              </View>
              <View>
                <Text style={styles.label}>Ətraflı</Text>
                <Textarea
                  style={styles.textArea}
                  rowSpan={4}
                  name="body"
                  ref={'nextInput'}
                  returnKeyType="go"
                  onChangeText={text => {
                    this.handleChange('body', text);
                  }}
                />
              </View>
            </View>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     add_task: task => {
//       dispatch(add_task(task));
//     },
//   };
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(AddTask);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    marginHorizontal: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  textArea: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
  label: {
    marginBottom: 10,
    fontSize: 14,
  },
});
export default AddTask;
