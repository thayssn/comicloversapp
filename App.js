import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createRootNavigator } from './app/config/router';
import store from './app/store';
import * as NavigationService from './app/config/navigationServices';
import { isSignedIn } from './app/config/auth';

export default class App extends Component {
  state = {
    signed: false,
    signLoaded: false,
  };

  async componentDidMount() {
    await isSignedIn()
      .then(res => this.setState({ signed: res, signLoaded: true }))
      .catch(err => alert('Erro', err));

    NavigationService.setNavigator(this.navigator);
  }

  render() {
    const { signLoaded, signed } = this.state;

    if (!signLoaded) {
      return null;
    }

    const Routes = createRootNavigator(signed);

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
