import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { Navigation } from 'react-native-navigation';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };

    this.changeDoneIcon = this.changeDoneIcon.bind(this);
    this.showTaskInner = this.showTaskInner.bind(this);
  }

  changeDoneIcon = () => {
    this.setState({
      pressed: !this.state.pressed,
    });
  };

  showTaskInner() {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'TaskInner',
              passProps: {
                task: this.props.task,
              },
              options: {
                topBar: {
                  title: {
                    text: this.props.task.title,
                  },
                },
              },
            },
          },
        ],
      },
    });
  }

  render() {
    return (
      <View>
        <Grid style={styles.cardContainer}>
          <Col style={styles.leftIcon}>
            <Icon
              style={this.state.pressed ? styles.leftIconDone : styles.leftIcon}
              onPress={this.changeDoneIcon}
              name="circle"
              type="FontAwesome"
            />
          </Col>
          <Col>
            <TouchableOpacity onPress={this.showTaskInner}>
              <View style={styles.body}>
                <Text style={styles.date}>{this.props.task.date}</Text>
                <Text style={styles.mainText}>{this.props.task.title}</Text>
              </View>
            </TouchableOpacity>
          </Col>
          <Col style={styles.rightIcon}>
            <Icon
              style={styles.rightIcon}
              name="ellipsis-v"
              type="FontAwesome"
            />
          </Col>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: 72,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
  body: {
    marginVertical: 5,
    marginLeft: 10,
  },
  date: {
    marginBottom: 1,
    color: '#a2a2a2',
  },
  mainText: {
    color: '#000',
  },
  leftIcon: {
    maxWidth: 30,
    alignItems: 'center',
    marginLeft: 5,
    color: 'white',
  },
  leftIconDone: {
    maxWidth: 30,
    alignItems: 'center',
    marginLeft: 5,
    color: 'green',
  },
  rightIcon: {
    maxWidth: 30,
    alignItems: 'center',
  },
});
