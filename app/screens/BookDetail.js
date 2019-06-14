import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { LinearGradient } from 'expo';
import {connect} from "react-redux";

class BookDetail extends React.Component {
  state = {
    book: null
  }

  componentWillMount(){
    console.log('books', this.props.books )
    let books = this.props.books;
    let book = books.find( book => book._id == this.props.navigation.getParam('id'))
    console.log('book', book)
    this.setState({ book })
  }

  render() {
    return (
      <View>
        <Image source={this.state.book.cover} style={styles.cover_image}/>
        <Text style={styles.title}> { this.state.book.title}</Text>
        <Text> { this.state.book.sinopsis}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cover_image: {
    width: 100,
    height: 150,
  },
  title: {
    fontSize: 20,
  }
});

const mapStateToProps = state => {
  return { books : state.books  }
}

export default connect(mapStateToProps)(BookDetail)