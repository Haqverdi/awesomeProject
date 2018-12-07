import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { View, Card, CardItem, Text, Body } from 'native-base';

export default class CurrencyList extends PureComponent {
  render() {
    return (
      <Card>
        <CardItem header bordered>
          <Text>Xərclər cədvəli</Text>
        </CardItem>
        <CardItem bordered>
          <Body style={styles.cardBody}>
            <View style={styles.chart}>
              <Text>here will be chart</Text>
            </View>
            <View style={styles.info}>
              <Text>
                NativeBase is a free and open source framework that enable
              </Text>
            </View>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardBody: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  chart: {
    flex: 1,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
