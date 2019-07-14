import React from 'react'; // eslint-ignore
import {
  Text, View, Image, TouchableHighlight,
} from 'react-native';

import CLGradient from '../../components/CLGradient';
import logo from '../../../assets/logo.png';
import styles from './styles';

const Root = ({ navigation }) => (
  <View style={styles.container}>
    <CLGradient />
    <Image style={styles.logo} source={logo} resizeMode="contain" />
    <View style={styles.input_group}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
        underlayColor="rgba(255,255,255,.2)"
      >
        <Text style={styles.text}>Login</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
        underlayColor="rgba(255,255,255,.2)"
      >
        <Text style={styles.text}>Cadastro</Text>
      </TouchableHighlight>
    </View>
  </View>
);
export default Root;
