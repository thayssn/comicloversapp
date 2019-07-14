import React from 'react';
import { CheckBox, Icon } from 'react-native-elements';

import styles from './styles';

const CLCheckBox = ({
  title, checked, onCheck,
}) => (
  <CheckBox
    checkedIcon={(
      <Icon
        size={24}
        type="ionicons"
        name="check-box"
        color="#FFF"
      />
    )}

    uncheckedIcon={(
      <Icon
        size={24}
        type="ionicons"
        name="check-box-outline-blank"
        color="#91d7dc"
      />
    )}

    title={title}
    checked={checked}
    onPress={() => { onCheck(); }}
    containerStyle={styles.checkboxContainer}
    textStyle={checked ? styles.checkboxCheckedText : styles.checkboxText}
  />
);


export default CLCheckBox;
