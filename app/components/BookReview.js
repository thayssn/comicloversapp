import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default function BookReview() {
  return (
    <View style={[styles.scene, { backgroundColor: '#FEAD09' }]} />
  );
}
