import React from 'react';
import { Provider } from 'react-redux';
import { Routes } from './app/config/router';
import store from './app/store';

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
