import React from 'react';
import {
  createStackNavigator, createSwitchNavigator, createAppContainer,
} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { fromBottom } from 'react-navigation-transitions';
import { Icon } from 'react-native-elements';
import Menu from './components/Menu';
import Main from './screens/Main';
import MyCollections from './screens/MyCollections';
import Root from './screens/Root';
import Login from './screens/Login';
import Register from './screens/Register';
import BookDetail from './screens/BookDetail';
import Profile from './screens/Profile';
import CreateEditCollection from './screens/CreateEditCollection';
import CollectionDetail from './screens/CollectionDetail';
import Scanner from './screens/Scanner';
import ForgotPassword from './screens/ForgotPassword';
import MyFavorites from './screens/Favorites';

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
    underlayColor="transparent"
    onPress={() => navigation.toggleDrawer()}
  />,
  headerRight: <Icon
    name="ios-barcode"
    type="ionicon"
    color="#FFF"
    size={40}
    underlayColor="transparent"
    containerStyle={{ paddingRight: 20 }}
    onPress={() => navigation.navigate('Scanner')}
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
    MyCollections: {
      screen: MyCollections,
      navigationOptions: {
        title: 'Minhas Coleções',
      },
    },
    MyFavorites: {
      screen: MyFavorites,
      navigationOptions: {
        title: 'Meus Favoritos',
      },
    },
    BookDetail: {
      screen: BookDetail,
      navigationOptions: {
        drawerLockMode: 'locked-closed',
        headerTintColor: '#fff',
        headerBackground: (<CLGradient />),
      },
    },
    CreateEditCollection: {
      screen: CreateEditCollection,
      navigationOptions: ({ navigation: { state } }) => ({
        title: state.params && state.params.collection ? 'Editar Coleção' : 'Criar Coleção',
        drawerLockMode: 'locked-closed',
        headerTintColor: '#fff',
        headerBackground: (<CLGradient />),
      }),
    },
    CollectionDetail: {
      screen: CollectionDetail,
    },
    Scanner: {
      screen: Scanner,
      navigationOptions: {
        title: 'Escanear Quadrinho',
        drawerLockMode: 'locked-closed',
        headerTintColor: '#fff',
        headerBackground: (<CLGradient />),
      },
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
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        title: 'Recuperar senha',
      },
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
