import React from 'react';

import { View, Text, TouchableWithoutFeedback } from 'react-native';
import CLGradient from '../../CLGradient';

const CLButton = ({
  style = {}, text = 'Salvar', onPress, icon,
}) => (

  <TouchableWithoutFeedback
    onPress={onPress}
  >
    <View style={[{
      borderColor: '#FFF',
      borderWidth: 1,
      borderRadius: 15,
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      justifyContent: 'center',
    }, style]}
    >
      <CLGradient />
      { icon && icon }
      <Text style={{
        color: '#FFF',
        padding: 5,
        fontSize: 18,
      }}
      >
        {text}

      </Text>
    </View>
  </TouchableWithoutFeedback>
);

export default CLButton;
