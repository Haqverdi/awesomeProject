import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Modal,
} from 'react-native'
import { Icon, Button } from 'native-base'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { get_token, get_dashboard_info } from '../redux/actions/index'
import { goTasks } from '../navigations'

const mapStateToProps = state => ({
  token: state.token,
  tokenError: state.tokenError,
})

const mapDispatchToProps = dispatch => {
  return {
    get_token: (email, password) => dispatch(get_token(email, password)),
    get_dashboard_info: () => dispatch(get_dashboard_info()),
  }
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      modalVisible: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
  }

  handleTextChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  setModalVisible(status) {
    this.setState({ modalVisible: status })
  }

  handleSubmit = async () => {
    try {
      await this.props.get_token(this.state.email, this.state.password)
      if (this.props.tokenError) {
        alert('Melumatlar yalnishdir, yeniden cehd edin.')
      } else {
        await AsyncStorage.setItem('TOKEN', this.props.token)
        await this.props.get_dashboard_info()
        goTasks()
      }
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.container}>
          <View style={formStyles.container}>
            {/* email */}
            <View style={formStyles.SectionStyle}>
              <Icon style={formStyles.ImageStyle} name="md-person" size={20} />
              <TextInput
                style={formStyles.input}
                placeholder="Email address"
                keyboardType="email-address"
                returnKeyType="next"
                autoCorrect={false}
                onChangeText={text => {
                  this.handleTextChange('email', text)
                }}
                onSubmitEditing={() => this.refs.txtPassword.focus()}
              />
            </View>
            {/* email */}
            {/* password */}
            <View style={formStyles.SectionStyle}>
              <Icon style={formStyles.ImageStyle} name="md-lock" size={20} />
              <TextInput
                style={formStyles.input}
                placeholder="Password"
                returnKeyType="go"
                secureTextEntry
                autoCorrect={false}
                onChangeText={text => {
                  this.handleTextChange('password', text)
                }}
                ref={'txtPassword'}
                onSubmitEditing={this.props.onLogin}
              />
            </View>
            {/* pssword */}
            {/* forgot password */}
            <View style={formStyles.forgotPasswordContainer}>
              <Text
                style={formStyles.forgotPasswordText}
                onPress={() => {
                  this.setModalVisible(true)
                }}
              >
                Forgot password
              </Text>
            </View>
            {/* forgot password */}
            {/* login button */}
            <Button style={formStyles.loginButton} onPress={this.handleSubmit}>
              <Text style={formStyles.loginText}>Daxil ol</Text>
            </Button>
            {/* login button */}
          </View>
          <View>
            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => alert('Modal closed')}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View>
                  <Text>Password Change template </Text>

                  <TouchableOpacity
                    style={{
                      borderColor: 'green',
                      borderWidth: 3,
                      backgroundColor: 'green',
                      margin: 20,
                    }}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible)
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>Hide Modal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAC85',
  },
})

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // inputs
  input: {
    height: 60,
    width: 230,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  // icons and input together
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  ImageStyle: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    alignItems: 'center',
  },
  // forgto password
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 45,
    width: 255,
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontSize: 18,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  loginButton: {
    height: 60,
    width: 255,
    borderRadius: 10,
    backgroundColor: '#ee6c2a',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 20,
    color: 'white',
  },
})
