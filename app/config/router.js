import React from 'react';
import {  createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import Main from '../screens/Main';
import Login from '../screens/Login';
import BookDetail from '../screens/BookDetail';

import CLGradient from "../components/CLGradient";

export const MainNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
    },
    BookDetail: {
      screen: BookDetail,
    }
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerBackground: (
        <CLGradient/>
      ),
      headerTintColor: '#fff',
      title: "Comic Lovers",
    },
  }
)
export const RootNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login,
    },
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Main',
  }
);

export const Routes = createAppContainer(RootNavigator);
