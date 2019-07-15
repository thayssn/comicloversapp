import React from 'react';

import { TextInput } from 'react-native';

import styles from './styles';

const CLTextInput = ({
  value, placeholder, onChangeText, keyboardType = 'default', secureTextEntry = false,
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#91d7dc"
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    autoCapitalize="none"
    value={value}
    onChangeText={onChangeText}
  />
);

export default CLTextInput;
