import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

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
      <Text>Ainda não foi implementado. </Text>
    </View>
  );
}
