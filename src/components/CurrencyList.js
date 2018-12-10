import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class CurrencyList extends PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={this.props.showExpenses}>
        <Card style={styles.cardContainer}>
          <CardItem header style={styles.header}>
            <Text style={styles.headerText}>Xərclər cədvəli</Text>
          </CardItem>
          <CardItem>
            <Grid>
              <Col>
                <Text />
              </Col>
              <Col>
                <Row style={styles.body}>
                  <Icon
                    name="circle"
                    type="FontAwesome"
                    style={{ color: '#68c298', marginLeft: 5 }}
                  />
                  <Text>
                    {this.props.data.salary.actual_amount}{' '}
                    {this.props.currentCurrency}
                  </Text>
                </Row>
                <Row>
                  <Text style={styles.descText}>Faktiki</Text>
                </Row>
                <Row style={styles.body}>
                  <Icon
                    name="circle"
                    type="FontAwesome"
                    style={{ color: '#c85f4c', marginLeft: 5 }}
                  />
                  <Text>
                    {this.props.data.salary.planned_amount}{' '}
                    {this.props.currentCurrency}
                  </Text>
                </Row>
                <Row>
                  <Text style={styles.descText}>Prognozlaşdırılmış</Text>
                </Row>
              </Col>
            </Grid>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

// styles
const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 5,
    borderColor: '#fff',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#eeeeee',
    shadowOffset: { height: 5, width: 5 },
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomColor: '#fbfbfb',
    borderBottomWidth: 2,
  },
  headerText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'normal',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descText: {
    fontSize: 12,
    marginLeft: 20,
    color: '#bcbcbc',
  },
});
