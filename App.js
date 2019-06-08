import React from 'react';
import { Routes } from './app/config/router';
import { Provider } from 'react-redux';
import store from './app/redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}