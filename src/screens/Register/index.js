import React, { Component } from 'react'; // eslint-ignore
import {
  Text, ScrollView, View, TouchableWithoutFeedback, TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CheckBox, TextInput } from '../../components/Form';
import { Creators as registerActions } from '../../store/ducks/register';

import CLGradient from '../../components/CLGradient';
import Loading from '../../components/Loading';
import styles from './styles';
import { verifyEmptyFields, verifyAcceptedTerms } from './verification';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
    acceptTerms: false,
  }

  handleSignUp = async () => {
    const { register } = this.props;
    const { ...user } = this.state;
    try {
      await verifyEmptyFields(user);
      await verifyAcceptedTerms(user);
      register(user);
      this.setState();
      this.setState({ password: '', confirmPassword: '', error: null });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  onCheck = () => {
    const { acceptTerms } = this.state;
    this.setState({ acceptTerms: !acceptTerms });
  }

  render() {
    const { navigation, loading, registerError } = this.props;
    const {
      name, email, password, confirmPassword, error, acceptTerms,
    } = this.state;
    return (
      <View style={[styles.container]}>
        <CLGradient />
        { loading
          ? <Loading />
          : (
            <ScrollView style={{ width: '100%' }}>
              <View style={styles.inner_container}>

                <>
                  <View style={styles.input_group}>
                    { registerError && <Text style={styles.error}>{registerError}</Text> }
                    { error && <Text style={styles.error}>{error}</Text> }

                    <TextInput
                      placeholder="nome"
                      value={name}
                      onChangeText={(value) => { this.setState({ name: value }); }}
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
                      onPress={this.handleSignUp}
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
              </View>
            </ScrollView>
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.register.loading,
  registerError: state.register.registerError,
});
const mapDispatchToProps = dispatch => bindActionCreators(registerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
