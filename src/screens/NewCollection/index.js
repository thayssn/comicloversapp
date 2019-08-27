import React, { Component } from 'react'; // eslint-ignore
import {
  Text, ScrollView, View, TouchableHighlight, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TextInput } from '../../components/Form';
import { Creators as collectionActions } from '../../store/ducks/collections';

import CLGradient from '../../components/CLGradient';
import Loading from '../../components/Loading';
import styles from './styles';

class NewCollection extends Component {
  state = {
    title: '',
    description: '',
    hasPermission: false,
    error: null,
    preview: null,
    image: null,
    loading: false,
  }

  async componentWillMount() {
    await this.getCameraRollPermission();
  }

  getCameraRollPermission = async () => {
    // permissions returns only for location permissions on iOS and under certain conditions,
    // see Permissions.LOCATION
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.setState({ hasPermission: true });
    } else {
      throw new Error('Camera permission not granted');
    }
  }

  handleSelectImage = async () => {
    const upload = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      aspect: [3, 4],
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
      const ext = 'jpg';

      const image = {
        uri: upload.uri,
        name: `${prefix}.${ext}`,
      };

      this.setState({ preview, image });
    }
  }

  handleSubmit = async () => {
    const { createCollection } = this.props;
    const { image, title, description } = this.state;

    if (!title) {
      this.setState({ error: 'Título obrigatório.' });
      return;
    }
    const data = new FormData();

    data.append('image', image);
    data.append('title', title);
    data.append('description', description);

    createCollection(data);
  }

  render() {
    const {
      title, description, error, hasPermission, preview, loading,
    } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CLGradient />
          { loading
            ? <Loading />
            : (
              <>
                {hasPermission ? (
                  <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage}>
                    <Text style={styles.selectButtonText}>Select Image</Text>
                  </TouchableOpacity>
                )
                  : (
                    <TouchableOpacity
                      style={styles.selectButton}
                      onPress={this.getCameraRollPermission}
                    >
                      <Text style={styles.selectButtonText}>Permissão</Text>
                    </TouchableOpacity>
                  )
              }

                { preview && <Image style={{ width: 300, height: 300 }} source={preview} /> }

                <View style={styles.input_group}>
                  { error && <Text style={styles.error}>{error}</Text> }

                  <TextInput
                    placeholder="título"
                    value={title}
                    onChangeText={(value) => { this.setState({ title: value }); }}
                  />

                  <TextInput
                    placeholder="descrição"
                    value={description}
                    multiline
                    numberOfLines={10}
                    onChangeText={(value) => { this.setState({ description: value }); }}
                    style={{ height: 300 }}
                  />

                  <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.handleSubmit()}
                    underlayColor="rgba(255,255,255,.2)"
                  >
                    <Text style={styles.text}>Criar Coleção</Text>
                  </TouchableHighlight>
                </View>
              </>
            )
          }

        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(collectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewCollection);

// export default NewCollection;
