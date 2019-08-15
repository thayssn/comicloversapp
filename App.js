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
    const signedIn = await isSignedIn();
    if (signedIn) {
      try {
        // await renewToken();
        this.setState({ signed: true, signLoaded: true });
      } catch (err) {
        console.log('There was a problem renewing the token', err);
        this.setState({ signed: false, signLoaded: true });
      }
    } else {
      this.setState({ signed: false, signLoaded: true });
    }
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
