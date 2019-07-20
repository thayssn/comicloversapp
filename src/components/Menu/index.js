import React from 'react';
import {
  ScrollView, View, StyleSheet, Text,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { onSignOut } from '../../services/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  routes: {
    fontSize: 18,
    fontWeight: '400',
    padding: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
    backgroundColor: '#CCC',
  },
  logout: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
  },
});

const Menu = ({ navigation }) => {
  const { navigate, state } = navigation;
  const { routes } = state;
  return (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        { routes.map(({ routeName }) => (
          <Text
            style={styles.routes}
            key={routeName}
            onPress={() => { navigate(routeName); }}
          >
            {routeName}
          </Text>
        ))}
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default Menu;
