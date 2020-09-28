/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  View, TouchableHighlight, Text, Image, TouchableOpacity, Platform,
} from 'react-native';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Creators as userActions } from '../../store/ducks/user';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { getUserToken } from '../../services/auth';
import api from '../../services/api';
import { TextInput } from '../../components/Form';
import CLGradient from '../../components/CLGradient';
import { BASE_URL } from '../../config/env_config';

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
    preview: null,
    image: null,
  }

  async componentDidMount() {
    await this.getCameraRollPermission();

    try {
      const userToken = await getUserToken();
      this.setState({ userToken });
      const { data: { email, name, profile_picture } } = await api.get('/me', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      this.setState({
        preview: { uri: `${BASE_URL}/${profile_picture}` },
        email,
        name,
      });
    } catch (err) {
      console.log(err);
    }
  }

  getCameraRollPermission = async () => {
    // permissions returns only for location permissions on iOS and under certain conditions,
    // see Permissions.LOCATION
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.setState({ hasCameraRollPermission: true });
    } else {
      throw new Error('Camera Roll permission not granted');
    }
  }

  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.setState({ hasCameraPermission: true });
    } else {
      throw new Error('Camera permission not granted');
    }
  }

  handleSelectImageFromGallery = () => {
    this.handleSelectImage(ImagePicker.launchImageLibraryAsync);
  }

  handleSelectImageFromCamera = () => {
    this.handleSelectImage(ImagePicker.launchCameraAsync);
  }

  handleSelectImage = async (launcher) => {
    const upload = await launcher({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 6],
      allowsEditing: true,
    });

    if (upload.error) {
      console.log('Error');
    } else if (upload.cancelled) {
      console.log('User canceled');
    } else {
      const preview = {
        uri: upload.uri,
      };

      const prefix = new Date().getTime();
      const ext = upload.uri.endsWith('png') ? 'png' : 'jpg';

      const image = {
        uri: upload.uri,
        name: `${prefix}.${ext}`,
        type: Platform.OS === 'ios' ? `${upload.type}` : `${upload.type}/${ext}`,
      };

      this.setState({ preview, image });
    }
  }

  handleUpdateUser = async () => {
    const {
      userToken, email, name, password, confirmPassword, image,
    } = this.state;

    const data = new FormData();

    data.append('email', email);

    data.append('name', name);

    if (password) {
      data.append('password', password);
      data.append('confirmPassword', confirmPassword);
    }

    if (image) {
      data.append('image', image);
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
      hasCameraRollPermission,
      hasCameraPermission,
      preview,
    } = this.state;

    return (
      <View style={styles.container}>
        <CLGradient />
        <View style={styles.inner_container}>

          <View style={{ borderWidth: 1, borderColor: '#91d7dc' }}>
            { preview ? <Image style={{ width: 120, height: 180 }} source={preview} />
              : <View style={{ width: 120, height: 180 }} /> }
          </View>
          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
            { hasCameraRollPermission ? (
              <TouchableOpacity
                style={[styles.button, { padding: 5, margin: 5, fontSize: 12 }]}
                onPress={this.handleSelectImageFromGallery}
              >
                <Text style={styles.text}>Galeria</Text>
              </TouchableOpacity>
            )
              : (
                <TouchableOpacity
                  style={[styles.button, {
                    padding: 5, margin: 5, fontSize: 12, flexDirection: 'row',
                  }]}
                  onPress={this.getCameraRollPermission}
                >
                  <Icon
                    name="lock"
                  />
                  <Text style={styles.text}>Liberar galeria.</Text>
                </TouchableOpacity>
              )
            }
            { hasCameraPermission ? (
              <TouchableOpacity
                style={[styles.button, { padding: 5, margin: 5, fontSize: 12 }]}
                onPress={this.handleSelectImageFromCamera}
              >
                <Text style={styles.text}>Tirar Foto</Text>
              </TouchableOpacity>
            )
              : (
                <TouchableOpacity
                  style={[styles.button, {
                    padding: 5, margin: 5, fontSize: 12, flexDirection: 'row',
                  }]}
                  onPress={this.getCameraPermission}
                >
                  <Icon
                    name="lock"
                  />
                  <Text style={styles.text}>Liberar câmera.</Text>
                </TouchableOpacity>
              )
            }
          </View>

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
