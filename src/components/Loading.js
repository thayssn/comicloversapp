import React from 'react';
import { View } from 'react-native';
import Lottie from 'lottie-react-native';
import CLGradient from './CLGradient';

const loadingAnimationJson = require('../../assets/loading.json');

export default class App extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <View style={{
        flex: 1,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <CLGradient />
        <Lottie
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            width: 140,
            height: 140,
          }}
          source={loadingAnimationJson}
        />
      </View>
    );
  }
}
