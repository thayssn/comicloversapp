import {
  Image, StyleSheet, View, Text, TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  collection_item: {
    width: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collection_item_image: {
    width: 100,
    height: 150,
  },
  collection_item_title: {
    fontSize: 10,
    paddingTop: 5,
  },
});

const Collection = ({ cover, title }) => (
  <TouchableWithoutFeedback onPress={() => {}}>
    <View style={styles.collection_item}>
      <Image source={cover} style={styles.collection_item_image} />
      <Text style={styles.collection_item_title}>
        {title}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

export default Collection;
