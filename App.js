import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createRootNavigator } from './src/router';
import store from './src/store';
import * as NavigationService from './src/services/navigation';
import { isSignedIn } from './src/services/auth';

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
