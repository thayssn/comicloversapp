import {
  Image, StyleSheet, View, Text, TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  book_item: {
    width: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  book_item_image: {
    width: 100,
    height: 150,
  },
  book_item_title: {
    fontSize: 10,
    paddingTop: 5,
  },
});

const Book = ({ navigation, book }) => (
  <TouchableWithoutFeedback onPress={() => {
    navigation.navigate('BookDetail', { id: book._id });
  }}
  >
    <View style={styles.book_item}>
      <Image source={book.cover} style={styles.book_item_image} />
      <Text style={styles.book_item_title}>
        {`${book.title} - ${book.id}`}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
export default withNavigation(Book);
