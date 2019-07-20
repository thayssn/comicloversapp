import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import CLGradient from '../CLGradient';

const styles = StyleSheet.create({
  collection_item: {
    margin: 5,
    width: 100,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CreateCollection = ({ createCollection }) => (
  <View style={[styles.collection_item, styles.collection_item_first]}>
    <CLGradient />
    <Icon
      onPress={createCollection}
      name="ios-add-circle"
      type="ionicon"
      color="#FFF"
      size={40}
    />
  </View>
);

export default CreateCollection;
