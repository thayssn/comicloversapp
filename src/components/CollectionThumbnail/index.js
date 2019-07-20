import {
  Image, View, Text, TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

import styles from './styles';

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
