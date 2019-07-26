import React from 'react';
import {
  createStackNavigator, createSwitchNavigator, createAppContainer,
} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { fromBottom } from 'react-navigation-transitions';
import { Icon } from 'react-native-elements';
import Menu from './components/Menu';
import Main from './screens/Main';
import Root from './screens/Root';
import Login from './screens/Login';
import Register from './screens/Register';
import BookDetail from './screens/BookDetail';
import Profile from './screens/Profile';
import NewCollection from './screens/NewCollection';
import CollectionDetail from './screens/CollectionDetail';

import CLGradient from './components/CLGradient';

const defaultNavigationOptions = ({ navigation }) => ({
  headerBackground: (<CLGradient />),
  headerTintColor: '#fff',
  title: navigation.title,
  headerLeft: <Icon
    name="menu"
    color="#FFF"
    size={30}
    containerStyle={{ paddingLeft: 10 }}
    onPress={() => navigation.toggleDrawer()}
  />,
  headerRight: <Icon
    name="md-qr-scanner"
    type="ionicon"
    color="#FFF"
    size={25}
    underlayColor="transparent"
    containerStyle={{ paddingRight: 20 }}
    onPress={() => alert('Not implemented yet')}
  />,

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
  {
    defaultNavigationOptions,
  },
);

export const BookNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: navigator => ({
        ...defaultNavigationOptions(navigator),
        title: 'Comic Lovers',
      }),
    },
    BookDetail: {
      screen: BookDetail,
      navigationOptions: {
        drawerLockMode: 'locked-closed',
        headerTintColor: '#fff',
        headerBackground: (<CLGradient />),
      },
    },
    NewCollection: {
      screen: NewCollection,
      navigationOptions: {
        title: 'Nova coleção',
        drawerLockMode: 'locked-closed',
        headerTintColor: '#fff',
        headerBackground: (<CLGradient />),
      },
    },
    CollectionDetail: {
      screen: CollectionDetail,
    },
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      drawerLockMode: 'locked-closed',
      headerTintColor: '#fff',
      headerBackground: (<CLGradient />),
    },
  },
);

export const MainNavigator = createDrawerNavigator(
  {
    Books: BookNavigator,
    Profile: ProfileNavigator,
  },
  {
    drawerType: 'slide',
    edgeWidth: 60,
    contentComponent: Menu,
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
