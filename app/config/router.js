import {  createStackNavigator, createAppContainer } from 'react-navigation';

import Main from '../screens/Main';

export const Root = createStackNavigator(
  {
    Main: {
      screen: Main,
    }
  },
  {
    initialRouteName: 'Main'
  }
);

export const Routes = createAppContainer(Root);