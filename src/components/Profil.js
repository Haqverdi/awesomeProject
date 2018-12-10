import React, { PureComponent } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Content, Text, View, List, ListItem } from 'native-base';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import moment from 'moment';
import 'moment/min/locales';
moment.locale('az');

class Profil extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed() {
    Navigation.dismissModal(this.props.componentId);
  }

  render() {
    const { profil, companies } = this.props;
    if (!profil || !companies) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Məlumat yoxdur.</Text>
        </View>
      );
    } else {
      return (
        <Container style={{ backgroundColor: '#f5f5f5' }}>
          <View style={styles.headerContainer}>
            <Image
              source={{ uri: profil.profilePicture }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderColor: 'white',
                borderWidth: 5,
                marginBottom: 10,
              }}
            />
            <Text style={styles.headerTitle}>mycompany</Text>
            <Text style={styles.headerEmail}>mobdevpronet@gmail.com</Text>
          </View>
          <Content>
            <View style={{ width: '100%' }}>
              <CompanyInfoList data={companies[0]} />
            </View>
            <View style={{ width: '100%' }}>
              <UserInfoList data={profil} />
            </View>
          </Content>
        </Container>
      );
    }
  }
}

// user info
const UserInfoList = ({ data }) => (
  <List>
    <ListItem itemDivider style={{ backgroundColor: 'white' }}>
      <Text>Şəxsi məlumatlar</Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Ad</Text>
      <Text>{data.name || 'Təyin olunmuyub'}</Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Soyad</Text>
      <Text>{data.lastname || 'Təyin olunmuyub'}</Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Email</Text>
      <Text>{data.email || 'Təyin olunmuyub'}</Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Telefon</Text>
      <Text>{data.phoneNumber || 'Təyin olunmuyub'}</Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Mobil nömrə</Text>
      <Text>{data.mobileNumber || 'Təyin olunmuyub'}</Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Doğulduğu tarix</Text>
      <Text>
        {data.birthDate && moment(data.birthDate.date).format('DD MMMM YYYY')}
      </Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Cins</Text>
      <Text>{data.gender == 1 ? 'Kişi' : 'Təyin olunmuyub'}</Text>
    </ListItem>
  </List>
);

// company info list
const CompanyInfoList = ({ data }) => (
  <List>
    <ListItem itemDivider style={{ backgroundColor: 'white' }}>
      <Text>Ümumi</Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Şirkətin adı</Text>
      <Text>{data.name || 'Təyin olunmuyub'}</Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Şirkət haqqında</Text>
      <Text>{data.description || 'Təyin olunmuyub'}</Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Faks</Text>
      <Text>{data.fax || 'Təyin olunmuyub'}</Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Mobil nömrə</Text>
      <Text>{data.mobileNumber || 'Təyin olunmuyub'}</Text>
    </ListItem>
    <ListItem style={styles.userInfo}>
      <Text style={styles.userInfoTitle}>Vaxt zonası</Text>
      <Text>{data.timezone || 'Təyin olunmuyub'}</Text>
    </ListItem>
  </List>
);

Profil.propTypes = {
  profil: PropTypes.object,
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '33.33%',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  headerEmail: {
    fontSize: 12,
    color: 'grey',
  },
  bodyContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  userInfoTitle: {
    color: 'grey',
  },
});

export default Profil;
