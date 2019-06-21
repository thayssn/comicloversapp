import React, { Component } from 'react';
import {
  TextInput, Text, StyleSheet, View, Image, TouchableWithoutFeedback,
} from 'react-native';

import CLGradient from '../components/CLGradient';
import logo from '../../assets/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_group: {
    width: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#FFF',
  },
  link: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    textDecorationLine: 'underline',
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
  },
  button: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    margin: 10,
  },
  logo: {
    height: 100,
    marginBottom: 30,
  },
});

export default class Login extends Component {
  signIn = async () => {
    const { navigation } = this.props;
    navigation.navigate('Main');
  };

  render() {
    return (
      <View style={styles.container}>
        <CLGradient />
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <View style={styles.input_group}>
          <TextInput style={styles.input} placeholderTextColor="#91d7dc" placeholder="E-mail" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#91d7dc"
            secureTextEntry
          />

          <TouchableWithoutFeedback onPress={() => alert('not implemented yet')}>
            <Text style={[styles.link, { marginBottom: 30 }]}>Esqueci minha senha</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.signIn}>
            <View style={styles.button}>
              <Text style={styles.text}>Entrar</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TouchableWithoutFeedback onPress={() => alert('not implemented yet')}>
          <Text style={[styles.link]}>Termos de Uso</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
