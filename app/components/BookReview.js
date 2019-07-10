import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-elements';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    width: '100%',
    paddingVertical: 15,
  },
});

export default function BookReview() {
  return (
    <View style={styles.scene}>
      <AirbnbRating
        reviews={['', '', '', '', '']}
        count={5}
        defaultRating={5}
        size={30}
      />
    </View>

  );
}
