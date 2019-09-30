import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const BookDescription = ({ book }) => (
  <View style={styles.scene}>
    <Text style={styles.title}>
        Autor:
      <Text style={styles.description}>
        {
          book.writers && book.writers.map((writer, index) => `${index > 0 ? ',' : ''} ${writer.name}`)
        }
      </Text>
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
