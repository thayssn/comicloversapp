import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import Main from '../screens/Main';
import Login from '../screens/Login';
import Register from '../screens/Register';
import BookDetail from '../screens/BookDetail';

import CLGradient from '../components/CLGradient';

export const MainNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
    },
    BookDetail: {
      screen: BookDetail,
    },
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerBackground: (
        <CLGradient />
      ),
      headerTintColor: '#fff',
      title: 'Comic Lovers',
    },
  },
);

export const createRootNavigator = (isSignedIn) => {
  const RootNavigator = createSwitchNavigator(
    {
      Register: {
        screen: Register,
      },
      Login: {
        screen: Login,
      },
      Main: MainNavigator,
    },
    {
      initialRouteName: isSignedIn ? 'Main' : 'Login',
    },
  );

  return createAppContainer(RootNavigator);
};
