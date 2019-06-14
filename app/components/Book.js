import {Image, StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import React from "react";

export default class Book extends React.Component{

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('BookDetail', {id: this.props.id})}>
        <View style={styles.book_item}>
          <Image source={this.props.cover} style={styles.book_item_image}>
          </Image>
          <Text style={styles.book_item_title}>
            {this.props.title} - {this.props.id}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  book_item: {
    width: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  book_item_image: {
    width: 100,
    height: 150,
  },
  book_item_title: {
    fontSize: 10,
    paddingTop: 5
  }
});