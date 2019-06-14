import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo';
import { Header, Icon } from 'react-native-elements';
import {connect} from 'react-redux';

import Book from './Book'

class BooksList extends React.Component{
  render () {
    return (
      <View style={styles.book_list_view}>
        <Text style={styles.book_list_title}>{this.props.title}</Text>
        <FlatList
          contentContainerStyle={styles.book_list}
          horizontal={true}
          data={this.props.books}
          renderItem={({item : book}) =>
          {
              return <Book id={book._id} title={book.title} cover={book.cover} navigation={this.props.navigation}/>
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  book_list_view: {
    padding: 5,
  },
  book_list: {
    alignItems: 'flex-start'
  },
  book_list_title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5
  }
});

const mapStateToProps = state => {
  return ({
    books: state.books
  })
}

export default connect(mapStateToProps)(BooksList)