/* eslint-disable camelcase */
import React from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import CLGradient from '../CLGradient';
import { BASE_URL } from '../../config/env_config';

import { onSignOut, getUserToken } from '../../services/auth';
import api from '../../services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexGrow: 1,
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  routes: {
    fontSize: 16,
    fontWeight: '400',
    padding: 10,
    color: '#FFF',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
    backgroundColor: '#DDD',
  },
  navigation: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 10,
  },
  bottom: {
    paddingBottom: 30,
  },
  logout: {
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 10,
    color: '#FFF',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inactive: {
    opacity: 0.3,
  },
  itemUser: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

class Menu extends React.Component {
  state = {
    profile_picture: 'https://i7.pngguru.com/preview/163/442/427/computer-icons-user-profile-icon-design-avatar.jpg',
    name: 'username',
  }

  async componentDidMount() {
    try {
      const userToken = await getUserToken();

      // eslint-disable-next-line camelcase
      const { data: { profile_picture, name } } = await api.get('/me', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      // eslint-disable-next-line react/destructuring-assignment
      const { profile_picture: defaultImg } = this.state;

      this.setState({
        // eslint-disable-next-line camelcase
        profile_picture: `${BASE_URL}/${profile_picture}` || defaultImg, name,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // const { routes } = state;
  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { profile_picture, name } = this.state;

    return (
      <View style={styles.container}>
        <CLGradient />
        <SafeAreaView style={styles.innerContainer} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.navigation}>
            {/* { routes.map(({ routeName }) => (
              <Text
                style={styles.routes}
                key={routeName}
                onPress={() => { navigate(routeName); }}
              >
                {routeName}
              </Text>
            ))} */}
            <View style={styles.itemUser}>
              <View style={{
                backgroundColor: '#dedede', width: 128, height: 128, borderRadius: 128, overflow: 'hidden', marginBottom: 20,
              }}
              >
                <Image
                  style={{
                    width: 128, height: 128,
                  }}
                  source={{ uri: profile_picture }}
                />
              </View>
              <Text style={{ color: 'white', fontSize: 20 }}>{name}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.itemWrapper}>
              <Icon
                name="user"
                type="font-awesome"
                color="#FFF"
                size={20}
                containerStyle={{ width: 20 }}
              />
              <Text
                style={styles.routes}
                onPress={() => { navigate('Profile'); }}
              >
              Perfil
              </Text>
            </View>
            <View style={styles.itemWrapper}>
              <Icon
                name="ios-book"
                type="ionicon"
                color="#FFF"
                size={20}
                containerStyle={{ width: 20 }}
              />
              <Text
                style={styles.routes}
                onPress={() => { navigate('Main'); }}
              >
              Navegar
              </Text>
            </View>
            <View style={styles.itemWrapper}>
              <Icon
                name="ios-bookmark"
                type="ionicon"
                color="#FFF"
                size={20}
                containerStyle={{ width: 20 }}
              />
              <Text
                style={styles.routes}
                onPress={() => { navigate('MyCollections'); }}
              >
              Minhas coleções
              </Text>
            </View>
            <View style={styles.itemWrapper}>
              <Icon
                name="ios-star"
                type="ionicon"
                color="#FFF"
                size={20}
                containerStyle={{ width: 20 }}
              />
              <Text
                style={styles.routes}
                onPress={() => { navigate('MyFavorites'); }}
              >
              Meus favoritos
              </Text>
            </View>
            <View style={styles.itemWrapper}>
              <Icon
                name="ios-heart"
                type="ionicon"
                color="#FFF"
                size={20}
                containerStyle={{ width: 20 }}
              />
              <Text
                style={styles.routes}
                onPress={() => { navigate('MyWanted'); }}
              >
              Quero ter
              </Text>
            </View>
            <View style={styles.itemWrapper}>
              <Icon
                name="ios-barcode"
                type="ionicon"
                color="#FFF"
                size={20}
                containerStyle={{ width: 20 }}
              />
              <Text
                style={styles.routes}
                onPress={() => { navigate('Scanner'); }}
              >
              Buscar por Código de Barras
              </Text>
            </View>
            <View style={styles.itemWrapper}>
              <Icon
                name="ios-create"
                type="ionicon"
                color="#FFF"
                size={20}
                containerStyle={{ width: 20 }}
              />
              <Text
                style={styles.routes}
                onPress={() => { navigate('CreateBook'); }}
              >
              Cadastrar novo quadrinho
              </Text>
            </View>
            <View style={styles.itemWrapper}>
              <Icon
                name="ios-star"
                type="ionicon"
                color="#FFF"
                size={20}
                containerStyle={{ width: 20 }}
              />
              <Text
                style={styles.routes}
                onPress={() => { navigate('UserBooks'); }}
              >
              Quadrinhos enviados
              </Text>
            </View>
            <View style={[styles.itemWrapper]}>
              <Icon
                name="ios-search"
                type="ionicon"
                color="#FFF"
                size={20}
                containerStyle={{ width: 20 }}
              />
              <Text
                style={styles.routes}
                onPress={() => { navigate('Search'); }}
              >
              Buscar quadrinho
              </Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.separator} />
            <Text
              style={styles.logout}
              onPress={() => {
                onSignOut();
                navigate('Root');
              }}
            >
                Logout
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default Menu;
