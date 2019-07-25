import { AsyncStorage } from 'react-native';
import api from './api';

export const TOKEN_KEY = '@ComicLovers:userToken';
export const onSignIn = token => AsyncStorage.setItem(TOKEN_KEY, token);

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token !== null;
};

export const getUserToken = async () => AsyncStorage.getItem(TOKEN_KEY);

export const renewToken = async () => {
  const token = await getUserToken();
  const { data: { access_token: newToken } } = await api.post('/token/', {}, {
    params: { access_token: token },
  });
  return onSignIn(newToken);
};
