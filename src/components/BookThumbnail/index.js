import React from 'react';
import {
  Image, View, Text, TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import { Creators as activeBookActions } from '../../store/ducks/activeBook';

import { BASE_URL } from '../../config/env_config';
import styles from './styles';

const Book = ({ book, changeBook }) => (
  <TouchableWithoutFeedback onPress={async () => {
    await changeBook(book);
  }}
  >
    <View style={styles.book_item}>
      { book.thumbnail === null
        ? (
          <View style={styles.collection_item} />
        )
        : (
          <Image
            source={{
              uri: `${BASE_URL}/${book.thumbnail}`,
            }}
            style={styles.book_item_image}
          />
        )
      }
      <Text style={styles.book_item_title}>
        {`${book.title} - ${book.id}`}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

const mapDispatchToProps = dispatch => bindActionCreators(activeBookActions, dispatch);

export default connect(null, mapDispatchToProps)(withNavigation(Book));
