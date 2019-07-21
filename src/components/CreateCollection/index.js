import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import CLGradient from '../CLGradient';

import styles from './styles';

const CreateCollection = ({ onPress }) => (
  <TouchableOpacity
    style={[styles.collection_item, styles.collection_item_first]}
    onPress={onPress}
  >
    <CLGradient />
    <Icon
      name="ios-add-circle"
      type="ionicon"
      color="#FFF"
      size={40}
    />
  </TouchableOpacity>
);

export default CreateCollection;
