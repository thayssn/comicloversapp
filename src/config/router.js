import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { fromBottom } from 'react-navigation-transitions';
import Main from '../screens/Main';
import Root from '../screens/Root';
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

export const RootNavigator = createStackNavigator(
  {
    Root: {
      screen: Root,
    },
    Register: {
      screen: Register,
      navigationOptions: {
        title: 'Cadastro',
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Login',
      },
    },
  },
  {
    initialRouteName: 'Root',
    transitionConfig: () => fromBottom(500),
    defaultNavigationOptions: {
      headerTransparent: true,
      headerTintColor: '#FFF',
    },
  },
);

export const createRootNavigator = (isSignedIn) => {
  const AppContainer = createSwitchNavigator(
    {
      Root: RootNavigator,
      Main: MainNavigator,
    },
    {
      initialRouteName: isSignedIn ? 'Main' : 'Root',
    },
  );

  return createAppContainer(AppContainer);
};
