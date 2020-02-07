import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import CLGradient from '../CLGradient';

import { onSignOut } from '../../services/auth';

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
});

class Menu extends React.Component {
  componentDidMount() {
  }

  // const { routes } = state;
  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;

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
            <View style={[styles.itemWrapper, styles.inactive]}>
              <Icon
                name="ios-search"
                type="ionicon"
                color="#FFF"
                size={20}
                containerStyle={{ width: 20 }}
              />
              <Text
                style={styles.routes}
                onPress={() => { navigate('Main'); }}
              >
              Busca
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
