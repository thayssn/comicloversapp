import React, { Component } from 'react'; // eslint-ignore
import {
  Text, View, Image, TouchableWithoutFeedback, TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CheckBox, TextInput } from '../../components/Form';
import { Creators as authActions } from '../../store/ducks/auth';

import CLGradient from '../../components/CLGradient';
import Loading from '../../components/Loading';
import logo from '../../../assets/logo.png';
import styles from './styles';

class Register extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
    acceptTerms: false,
  }

  handleSignUp = () => {
    const { signUp } = this.props;
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ error: 'Por favor, preencha todos os campos.' });
      return;
    }
    signUp({ username, password });
    this.setState({ password: '', error: null });
  }

  onCheck = () => {
    const { acceptTerms } = this.state;
    this.setState({ acceptTerms: !acceptTerms });
  }

  render() {
    const { navigation, loading, authError } = this.props;
    const {
      name, username, email, password, confirmPassword, error, acceptTerms,
    } = this.state;
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
                  placeholder="nome"
                  value={name}
                  onChangeText={(value) => { this.setState({ name: value }); }}
                />

                <TextInput
                  placeholder="usuário"
                  value={username}
                  onChangeText={(value) => { this.setState({ username: value }); }}
                />

                <TextInput
                  placeholder="e-mail"
                  value={email}
                  keyboardType="email-address"
                  onChangeText={(value) => { this.setState({ email: value }); }}
                />

                <TextInput
                  secureTextEntry
                  placeholder="senha"
                  value={password}
                  onChangeText={(value) => { this.setState({ password: value }); }}
                />

                <TextInput
                  secureTextEntry
                  placeholder="confirme a senha"
                  value={confirmPassword}
                  onChangeText={(value) => { this.setState({ confirmPassword: value }); }}
                />

                <CheckBox
                  checked={acceptTerms}
                  title="Aceito os Termos e Condições"
                  onCheck={this.onCheck}
                />

                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.handleSignUp()}
                  underlayColor="rgba(255,255,255,.2)"
                >
                  <Text style={styles.text}>Criar conta</Text>
                </TouchableHighlight>
              </View>

              <TouchableWithoutFeedback onPress={() => alert('not implemented yet')}>
                <Text style={[styles.link]}>Termos e condições</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.link]}>Já tenho uma conta</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
