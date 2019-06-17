import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    width: '100%',
    paddingVertical: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    fontWeight: '300',
  },
});

const BookDescription = ({ book }) => (
  <View style={styles.scene}>
    <Text style={styles.title}>
        Autor:
      <Text style={styles.description}>{` ${book.author}`}</Text>
    </Text>
    <Text style={styles.title}>
      Páginas:
      <Text style={styles.description}>{` ${book.pages}`}</Text>
    </Text>
    <Text style={styles.title}>
      Descrição:
      <Text style={styles.description}>{` ${book.description}`}</Text>
    </Text>
  </View>
);
export default BookDescription;
