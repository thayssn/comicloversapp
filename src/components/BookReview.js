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

const BookReview = ({ rating, onFinishRating }) => (
  <View style={styles.scene}>
    <AirbnbRating
      reviews={[]}
      count={5}
      defaultRating={rating}
      size={30}
      onFinishRating={onFinishRating}
    />
  </View>

);
export default BookReview;
