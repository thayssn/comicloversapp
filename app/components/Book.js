import React from 'react';
import {
  Image, StyleSheet, View, Text, TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
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

const Book = ({ navigation, book, dispatch }) => (
  <TouchableWithoutFeedback onPress={() => {
    dispatch({ type: 'CHANGE_BOOK', book });
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

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(withNavigation(Book));
