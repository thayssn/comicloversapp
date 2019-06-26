import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Routes } from './app/config/router';
import store from './app/store';
import * as NavigationService from './app/config/navigationServices';


export default class App extends Component {
  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }

  render() {
    return (
      <Provider store={store}>
        <Routes ref={(nav) => {
          this.navigator = nav;
        }}
        />
      </Provider>
    );
  }
}
