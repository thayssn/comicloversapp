import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Creators as userActions } from '../../store/ducks/user';
import { getUserToken } from '../../services/auth';
import api from '../../services/api';
import { TextInput } from '../../components/Form';
import CLGradient from '../../components/CLGradient';

import styles from './style';

class Profile extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    userToken: '',
    success: null,
    error: null,
  }

  async componentWillMount() {
    try {
      const userToken = await getUserToken();
      this.setState({ userToken });
      const { data: { email, name } } = await api.get('/me', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      this.setState({
        email, name,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleUpdateUser = async () => {
    const {
      userToken, email, name, password, confirmPassword,
    } = this.state;
    const data = { email, name };

    if (password) {
      data.password = password;
      data.confirmPassword = confirmPassword;
    }

    try {
      const { data: user } = await api.put('/me/', data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      this.setState({
        email: user.email,
        name: user.name,
        password: '',
        confirmPassword: '',
        success: 'Informações atualizadas com sucesso.',
        error: null,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        password: '',
        confirmPassword: '',
        error: 'Erro ao salvar informações.',
        success: null,
      });
    }
  }

  render() {
    const {
      email, name, password, confirmPassword, error, success,
    } = this.state;

    return (
      <View style={styles.container}>
        <CLGradient />
        <View style={styles.inner_container}>

          { error && <Text style={styles.error}>{error}</Text>}
          { success && <Text style={styles.text}>{success}</Text>}

          <TextInput
            placeholder="nome"
            value={name}
            onChangeText={(value) => { this.setState({ name: value }); }}
          />
          <TextInput
            type="email"
            placeholder="email"
            keyboardType="email-address"
            value={email}
            onChangeText={(value) => { this.setState({ email: value }); }}
          />
          <TextInput
            placeholder="nova senha"
            value={password}
            secureTextEntry
            onChangeText={(value) => { this.setState({ password: value }); }}
          />
          <TextInput
            placeholder="confirmar nova senha"
            value={confirmPassword}
            secureTextEntry
            onChangeText={(value) => { this.setState({ confirmPassword: value }); }}
          />

          <TouchableHighlight
            style={styles.button}
            onPress={() => this.handleUpdateUser()}
            underlayColor="rgba(255,255,255,.2)"
          >
            <Text style={styles.text}>Salvar</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   user: state.user,
// });

// const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;
