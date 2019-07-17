import React from 'react';
import {
  createStackNavigator, createSwitchNavigator, createAppContainer,
} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { fromBottom } from 'react-navigation-transitions';
import Main from './screens/Main';
import Root from './screens/Root';
import Login from './screens/Login';
import Register from './screens/Register';
import BookDetail from './screens/BookDetail';
import Profile from './screens/Profile';

import CLGradient from './components/CLGradient';

const defaultNavigationOptions = ({ navigation }) => ({
  headerBackground: (
    <CLGradient />
  ),
  headerTintColor: '#fff',
  title: navigation.title,
});

export const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil',
      },
    },
  },
  { defaultNavigationOptions },
);

export const BookNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'Comic Lovers',
      },
    },
    BookDetail: {
      screen: BookDetail,
      navigationOptions: { drawerLockMode: 'locked-closed' },
    },
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions,
  },
);

export const MainNavigator = createDrawerNavigator(
  {
    Books: BookNavigator,
    Profile: ProfileNavigator,
  },
  {
    drawerIcon: 'A',
    drawerType: 'slide',
    edgeWidth: 100,
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
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
