import React from 'react';
import {
  StyleSheet, View, FlatList,
} from 'react-native';

import BookThumbnail from './BookThumbnail';

const styles = StyleSheet.create({
  book_list_view: {
    padding: 5,
    width: '100%',
    flex: 1,
  },
  book_list: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  book_list_title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
  },
});

const BooksGrid = ({ books }) => (
  <View style={styles.book_list_view}>
    <FlatList
      contentContainerStyle={styles.book_list}
      numColumns={3}
      data={books}
      renderItem={({ item: book }) => (
        <View style={{ alignItems: 'flex-start', width: '33.33%' }}>
          <BookThumbnail
            book={book}
          />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);

export default BooksGrid;
