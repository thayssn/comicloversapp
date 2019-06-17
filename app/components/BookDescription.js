import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default function BookDescription() {
  return (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
      <Text style={styles.title}>
        {'Autor: '}
      </Text>
      <Text style={styles.title}>
        {'Páginas: '}
      </Text>
      <Text>
        {'Descrição: '}
      </Text>
    </View>
  );
}
