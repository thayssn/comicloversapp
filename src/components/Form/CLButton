import React from 'react';

import { TextInput } from 'react-native';

import styles from './styles';

const CLTextInput = ({
  style, value, placeholder, onChangeText, keyboardType = 'default', secureTextEntry = false, multiline = false, numberOfLines = 1,
}) => (
  <TextInput
    style={[styles.input, style]}
    placeholder={placeholder}
    placeholderTextColor="#91d7dc"
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    autoCapitalize="none"
    value={value}
    onChangeText={onChangeText}
    multiline={multiline}
    numberOfLines={numberOfLines}
  />
);

export default CLTextInput;
