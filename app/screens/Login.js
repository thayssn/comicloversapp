import React, { Component } from 'react'; // eslint-ignore
import {
  TextInput, Text, StyleSheet, View, Image, TouchableWithoutFeedback,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as authActions } from '../store/ducks/auth';

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

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  render() {
    const { loading, login } = this.props;
    const { username, password } = this.state;
    return (
      <View style={styles.container}>
        <CLGradient />
        { loading
          ? <Text>Carregando</Text>
          : (
            <>
              <Image style={styles.logo} source={logo} resizeMode="contain" />
              <View style={styles.input_group}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#91d7dc"
                  autoCapitalize="none"
                  placeholder="Username"
                  value={username}
                  onChangeText={(value) => { this.setState({ username: value }); }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor="#91d7dc"
                  secureTextEntry
                  value={password}
                  autoCapitalize="none"
                  onChangeText={(value) => { this.setState({ password: value }); }}
                />

                <TouchableWithoutFeedback onPress={() => alert('not implemented yet')}>
                  <Text style={[styles.link, { marginBottom: 30 }]}>Esqueci minha senha</Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => login(this.state)}>
                  <View style={styles.button}>
                    <Text style={styles.text}>Entrar</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <TouchableWithoutFeedback onPress={() => alert('not implemented yet')}>
                <Text style={[styles.link]}>Termos de Uso</Text>
              </TouchableWithoutFeedback>
            </>
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
});
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
