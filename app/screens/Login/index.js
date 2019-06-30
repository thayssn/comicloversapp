import React, { Component } from 'react'; // eslint-ignore
import {
  TextInput, Text, View, Image, TouchableWithoutFeedback, TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as authActions } from '../../store/ducks/auth';

import CLGradient from '../../components/CLGradient';
import Loading from '../../components/Loading';
import logo from '../../../assets/logo.png';
import styles from './styles';

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: null,
  }

  handleSignIn = () => {
    const { login } = this.props;
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ error: 'Por favor, preencha todos os campos.' });
      return;
    }
    login({ username, password });
    this.setState({ password: '', error: null });
  }

  render() {
    const { loading, authError } = this.props;
    const { username, password, error } = this.state;
    return (
      <View style={styles.container}>
        <CLGradient />
        { loading
          ? <Loading />
          : (
            <>
              <Image style={styles.logo} source={logo} resizeMode="contain" />
              <View style={styles.input_group}>
                { authError && <Text style={styles.error}>{authError}</Text> }
                { error && <Text style={styles.error}>{error}</Text> }
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#91d7dc"
                  autoCapitalize="none"
                  placeholder="usuário"
                  value={username}
                  onChangeText={(value) => { this.setState({ username: value }); }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="senha"
                  placeholderTextColor="#91d7dc"
                  secureTextEntry
                  value={password}
                  autoCapitalize="none"
                  onChangeText={(value) => { this.setState({ password: value }); }}
                />


                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.handleSignIn()}
                  underlayColor="rgba(255,255,255,.2)"
                >
                  <Text style={styles.text}>Entrar</Text>
                </TouchableHighlight>
              </View>

              <TouchableWithoutFeedback onPress={() => alert('not implemented yet')}>
                <Text style={[styles.link, { marginBottom: 30 }]}>Esqueci minha senha</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => alert('not implemented yet')}>
                <Text style={[styles.link]}>Ainda não tenho conta</Text>
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
  authError: state.auth.authError,
});
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
