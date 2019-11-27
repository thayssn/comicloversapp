import {
  Image, View, Text, TouchableWithoutFeedback,
} from 'react-native';
import {
  Icon,
} from 'react-native-elements';
import React from 'react';
import { BASE_URL } from '../../config/env_config';

import styles from './styles';

const CollectionThumbnail = ({
  cover, title, onPress, titleStyle, hasCollection = true, listing = true,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={[styles.collection_item]}>
      { cover
        ? (
          <>
            <Image
              source={{
                uri: `${BASE_URL}/${cover}`,
              }}
              style={[styles.collection_item_image, hasCollection && !listing && { opacity: 1, borderWidth: 4, borderColor: '#20AEC0' }]}
            />
          </>
        )
        : <View style={[styles.collection_default_cover, hasCollection && !listing && { opacity: 1, borderWidth: 4, borderColor: '#20AEC0' }]} />
      }
      { hasCollection && !listing
        && (
        <Icon
          size={20}
          type="ionicons"
          name="bookmark"
          color="#20AEC0"
          containerStyle={{ position: 'absolute', top: 5, right: 5 }}
        />
        )
      }
      <Text style={[styles.collection_item_title, titleStyle]}>
        {title}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

export default CollectionThumbnail;
