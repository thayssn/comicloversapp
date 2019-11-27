import React, { Component } from 'react'; // eslint-ignore
import {
  Text, ScrollView, View, TouchableHighlight, TouchableOpacity, Image, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TextInput } from '../../components/Form';
import { Creators as collectionActions } from '../../store/ducks/collections';

import { BASE_URL } from '../../config/env_config';
import CLGradient from '../../components/CLGradient';
import Loading from '../../components/Loading';
import styles from './styles';

class CreateEditCollection extends Component {
  state = {
    title: '',
    description: '',
    hasPermission: false,
    error: null,
    preview: null,
    image: null,
    loading: false,
    mode: 'create',
    collection: null,
  }

  async componentWillMount() {
    await this.getCameraRollPermission();
  }

  componentDidMount() {
    const { navigation: { state: { params } } } = this.props;

    if (params && params.collection) {
      const { collection } = params;

      this.setState({
        mode: 'edit',
        collection,
        title: collection.title,
        preview: { uri: `${BASE_URL}/${collection.thumbnail}` },
        description: collection.description,
      });
    }
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
      aspect: [3, 4.5],
      // width: 120,
      // height: 180,
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

  handleSubmit = async () => {
    const { createCollection, editCollection } = this.props;
    const {
      image, title, description, mode, collection,
    } = this.state;

    if (!title) {
      this.setState({ error: 'Título obrigatório.' });
      return;
    }
    const data = new FormData();

    if (image) { data.append('image', image); }
    data.append('title', title);
    data.append('description', description);

    try {
      if (mode === 'edit') {
        editCollection(data, collection.id, collection.title);
      } else {
        createCollection(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleDelete = () => {
    const { collection } = this.state;
    const { deleteCollection } = this.props;
    deleteCollection(collection.id);
  }

  render() {
    const {
      title, description, error, hasPermission, preview, loading, mode,
    } = this.state;
    return (
      <View style={{ flex: 1, height: '100%' }}>
        <CLGradient />

        <ScrollView style={{ flex: 1, height: '100%' }}>
          <View style={styles.container}>
            { loading
              ? <Loading />
              : (
                <>
                  {hasPermission ? (
                    <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage}>
                      <View>
                        { preview ? <Image style={{ width: 120, height: 180 }} source={preview} />
                          : <View style={{ width: 120, height: 180, backgroundColor: '#DDD' }} /> }
                      </View>
                      <Text style={styles.selectButtonText}>Selecionar uma imagem</Text>
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


                  <View style={styles.input_group}>
                    { error && <Text style={styles.error}>{error}</Text> }

                    <TextInput
                      placeholder="Título"
                      value={title}
                      onChangeText={(value) => { this.setState({ title: value }); }}
                    />

                    <TextInput
                      placeholder="Descrição"
                      value={description}
                      multiline
                      numberOfLines={2}
                      onChangeText={(value) => { this.setState({ description: value }); }}
                      style={{ height: 100 }}
                    />
                    { mode === 'edit'
                      ? (
                        <>
                          <TouchableHighlight
                            style={styles.button}
                            onPress={() => this.handleSubmit()}
                            underlayColor="rgba(255,255,255,.2)"
                          >
                            <Text style={styles.text}>Salvar</Text>
                          </TouchableHighlight>

                          <Text style={styles.error} onPress={this.handleDelete}>
                            Deletar Coleção
                          </Text>
                        </>
                      )
                      : (
                        <TouchableHighlight
                          style={styles.button}
                          onPress={() => this.handleSubmit()}
                          underlayColor="rgba(255,255,255,.2)"
                        >
                          <Text style={styles.text}>Criar</Text>
                        </TouchableHighlight>
                      )
                    }

                  </View>
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
});

const mapDispatchToProps = dispatch => bindActionCreators(collectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditCollection);

// export default CreateEditCollection;
