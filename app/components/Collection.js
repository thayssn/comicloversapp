import {Image, StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import React from "react";

export default class Collection extends React.Component{

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => alert('not implemented yet')}>
        <View style={styles.collection_item}>
          <Image source={this.props.cover} style={styles.collection_item_image}>
          </Image>
          <Text style={styles.collection_item_title}>
            {this.props.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  collection_item: {
    width: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  collection_item_image: {
    width: 100,
    height: 150,
  },
  collection_item_title: {
    fontSize: 10,
    paddingTop: 5
  }
});