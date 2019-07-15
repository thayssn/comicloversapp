import React from 'react';
import { View } from 'react-native';
import { DangerZone } from 'expo';

const { Lottie } = DangerZone;
const loadingAnimationJson = require('../../assets/loading.json');

export default class App extends React.Component {
  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
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
