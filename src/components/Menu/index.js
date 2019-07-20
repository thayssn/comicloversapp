import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
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
    backgroundColor: '#EEE',
  },
  navigation: {
    flex: 1,
    flexGrow: 1,

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
});

const Menu = ({ navigation }) => {
  const { navigate, state } = navigation;
  const { routes } = state;
  return (
    <View style={styles.container}>
      <CLGradient />
      <SafeAreaView style={styles.innerContainer} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.navigation}>
          { routes.map(({ routeName }) => (
            <Text
              style={styles.routes}
              key={routeName}
              onPress={() => { navigate(routeName); }}
            >
              {routeName}
            </Text>
          ))}
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
};

export default Menu;
