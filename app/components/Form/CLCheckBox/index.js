import React from 'react';
import { CheckBox, Icon } from 'react-native-elements';

import styles from './styles';

const CLCheckBox = ({
  title, checked, onCheck,
}) => (
  <CheckBox
    checkedIcon={(
      <Icon
        size={18}
        type="ionicons"
        name="check-box"
        color="#91d7dc"
      />
    )}

    uncheckedIcon={(
      <Icon
        size={18}
        type="ionicons"
        name="check-box-outline-blank"
        color="#91d7dc"
      />
    )}

    title={title}
    checked={checked}
    onPress={() => { onCheck(); }}
    containerStyle={styles.checkboxContainer}
    textStyle={styles.checkboxText}
  />
);


export default CLCheckBox;
