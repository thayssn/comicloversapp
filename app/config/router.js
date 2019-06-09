import React from 'react';
import {  createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import Main from '../screens/Main';
import Login from '../screens/Login';

import CLGradient from "../components/CLGradient";

export const MainNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
    }
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerBackground: (
        <CLGradient/>
      ),
      headerTintColor: '#fff',
    },
  }
)
export const RootNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Main,
    },
    Main: MainNavigator
  },
  {
    initialRouteName: 'Login',
  }
);

export const Routes = createAppContainer(RootNavigator);