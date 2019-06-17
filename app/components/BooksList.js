import React from 'react';
import {
  StyleSheet, Text, View, FlatList,
} from 'react-native';
import { connect } from 'react-redux';

import Book from './Book';

const styles = StyleSheet.create({
  book_list_view: {
    padding: 5,
  },
  book_list: {
    alignItems: 'flex-start',
  },
  book_list_title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
  },
});

const BooksList = ({ title, books }) => (
  <View style={styles.book_list_view}>
    <Text style={styles.book_list_title}>{title}</Text>
    <FlatList
      contentContainerStyle={styles.book_list}
      horizontal
      data={books}
      renderItem={({ item: book }) => (
        <Book
          book={book}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);

const mapStateToProps = state => ({
  books: state.books,
});

export default connect(mapStateToProps)(BooksList);
