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

class ForgotPassword extends Component {
  state = {
    email: '',
    error: null,
  }

  handleSignIn = () => {
    const { requestResetPassword } = this.props;
    const { email } = this.state;
    if (!email) {
      this.setState({ error: 'Por favor, preencha todos os campos.' });
      return;
    }
    requestResetPassword({ email });
    this.setState({ error: null });
  }

  render() {
    const {
      loading, navigation, successMessage, errorMessage,
    } = this.props;
    const { email, error } = this.state;
    return (
      <View style={styles.container}>
        <CLGradient />
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.inner_container}>
            { loading
              ? <Loading />
              : (
                <>
                  <Text style={styles.text}> Informe o e-mail cadastrado. </Text>
                  { successMessage && <Text style={styles.success}>{successMessage}</Text> }
                  { !successMessage
                    && (
                    <View style={styles.input_group}>

                      { error && <Text style={styles.error}>{error}</Text> }
                      { errorMessage && <Text style={styles.error}>{errorMessage}</Text> }

                      <TextInput
                        placeholder="email"
                        value={email}
                        onChangeText={(value) => { this.setState({ email: value }); }}
                      />

                      <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.handleSignIn()}
                        underlayColor="rgba(255,255,255,.2)"
                      >
                        <Text style={styles.text}>Recuperar Senha</Text>
                      </TouchableHighlight>
                    </View>
                    )
                  }

                  <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.link]}>Login</Text>
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
  successMessage: state.auth.successMessage,
  errorMessage: state.auth.errorMessage,
});
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
