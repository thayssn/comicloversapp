import React from 'react';
import { LinearGradient } from 'expo';

const CLGradient = () => (
  <LinearGradient
    colors={['#40B89D', '#00A5E2']}
    start={[0, 0]}
    end={[1, 0]}
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '100%',
    }}
  />
);

export default CLGradient;
