import {
  Image, View, Text, TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { BASE_URL } from '../../config/env_config';

import styles from './styles';

const CollectionThumbnail = ({
  cover, title, onPress, titleStyle,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={[styles.collection_item]}>
      { cover
        ? (
          <Image
            source={{
              uri: `${BASE_URL}/${cover}`,
            }}
            style={styles.collection_item_image}
          />
        )
        : <View style={styles.collection_default_cover} />
      }
      <Text style={[styles.collection_item_title, titleStyle]}>
        {title}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

export default CollectionThumbnail;
