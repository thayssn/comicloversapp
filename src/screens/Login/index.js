import React, { Component } from 'react'; // eslint-ignore
import {
  Text, ScrollView, View, TouchableWithoutFeedback, TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput } from '../../components/Form';
import { Creators as authActions } from '../../store/ducks/auth';

import CLGradient from '../../components/CLGradient';
import Loading from '../../components/Loading';
import styles from './styles';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: null,
  }

  handleSignIn = () => {
    const { login } = this.props;
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: 'Por favor, preencha todos os campos.' });
      return;
    }
    login({ email, password });
    this.setState({ password: '', error: null });
  }

  render() {
    const { loading, authError, navigation } = this.props;
    const { email, password, error } = this.state;
    return (
      <View style={styles.container}>
        <CLGradient />
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.inner_container}>
            { loading
              ? <Loading />
              : (
                <>
                  <View style={styles.input_group}>
                    { authError && <Text style={styles.error}>{authError}</Text> }
                    { error && <Text style={styles.error}>{error}</Text> }
                    <TextInput
                      placeholder="usuário"
                      value={email}
                      onChangeText={(value) => { this.setState({ email: value }); }}
                    />
                    <TextInput
                      secureTextEntry
                      placeholder="senha"
                      value={password}
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
                    <Text style={[styles.link]}>Esqueci minha senha</Text>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                    <Text style={[styles.link]}>Criar uma conta</Text>
                  </TouchableWithoutFeedback>

                </>
              )
          }
          </View>
        </ScrollView>
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
