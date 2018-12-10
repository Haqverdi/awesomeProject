import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, View, Text, List, ListItem } from 'native-base';
import { Navigation } from 'react-native-navigation';

export default class CurrencyListInner extends PureComponent {
  constructor(props) {
    super(props);
    // bind Navigation events
    Navigation.events().bindComponent(this);
  }

  // close modal on left header btn pressed
  navigationButtonPressed() {
    Navigation.dismissModal(this.props.componentId);
  }

  render() {
    const { data } = this.props;
    return (
      <Container style={styles.container}>
        <Content padder>
          <View style={{ marginBottom: 10 }}>
            <FaktikiList data={data} />
          </View>
          <View>
            <PrognozList data={data} />
          </View>
        </Content>
      </Container>
    );
  }
}

const FaktikiList = ({ data }) => (
  <List style={styles.listContainer}>
    <ListItem first style={styles.listHeader}>
      <Text>Faktiki məbləğ</Text>
    </ListItem>
    {Object.keys(data.expenses_raiting).map(item => {
      return (
        <ListItem key={item + '-faktiki'}>
          <Text>
            {data.expenses_raiting[item].expenseNameName}{' '}
            <Text style={styles.listItem}>
              {data.expenses_raiting[item].expenseActualAmount}{' '}
              {data.expenses_raiting[item].tenantCurrencyCode}
            </Text>
          </Text>
        </ListItem>
      );
    })}
  </List>
);

const PrognozList = ({ data }) => (
  <List style={styles.listContainer}>
    <ListItem first style={styles.listHeader}>
      <Text>Prognozlaşdırılmış məbləğ</Text>
    </ListItem>
    {Object.keys(data.expenses_raiting).map(item => {
      return (
        <ListItem key={item + '-prognoz'}>
          <Text>
            {data.expenses_raiting[item].expenseNameName}{' '}
            <Text style={styles.listItem}>
              {data.expenses_raiting[item].expensePlannedAmount != null
                ? data.expenses_raiting[item].expensePlannedAmount
                : 0.0}{' '}
              {data.expenses_raiting[item].tenantCurrencyCode}
            </Text>
          </Text>
        </ListItem>
      );
    })}
  </List>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    backgroundColor: 'white',
  },
  listHeader: {
    fontWeight: 'bold',
    borderBottomColor: 'white',
  },
  listItem: {
    color: 'green',
  },
});
