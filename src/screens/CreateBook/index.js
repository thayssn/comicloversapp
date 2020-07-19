/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import {
  View, TouchableHighlight, Text, TouchableOpacity, Image, Modal, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import DatePicker from 'react-native-datepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import Loading from '../../components/Loading';
import {
  TextInput,
} from '../../components/Form';

import CLGradient from '../../components/CLGradient';

import styles from './styles';
import { Creators as bookActions } from '../../store/ducks/books';

class CreateBook extends Component {
  state = {
    preview: null,
    image: null,
    hasCameraRollPermission: false,
    hasCameraPermission: false,
    form: {
      title: '',
      isbn: '',
      isbn_10: '',
      description: '',
      pages: '',
      edition: '',
      publishing_date: new Date(),
      price: '',
    },
    error: '',
    modal: {
      modalVisible: false,
      error: false,
      errorTxt: 'Ops! Algo deu errado!',
      okTxt: 'Quadrinho cadastrado com sucesso!',
    },
  }

  async componentDidMount() {
    await this.getCameraRollPermission();
    const { navigation: { state: { params } } } = this.props;

    if (params) {
      if (params.isbn) {
        const { form } = this.state;

        this.setState({
          form: {
            ...form,
            isbn: params.isbn,
          },
        });
      }
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
    // permissions returns only for location permissions on iOS and under certain conditions,
    // see Permissions.LOCATION
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

  updateFormValue = (key, value) => {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        [key]: value,
      },
    });
  }

  saveBook = async () => {
    const { createBook } = this.props;
    const { form, image } = this.state;

    const data = new FormData();

    if (!form.title) {
      this.setState({ error: 'Falha ao salvar. Título obrigatório.' });
      return;
    }

    if (!form.isbn) {
      this.setState({ error: 'Falha ao salvar. ISBN obrigatório.' });
      return;
    }

    if (image) {
      data.append('image', image);
    }

    const jsonPayload = Object.entries(form).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {});
    data.append('jsonPayload', JSON.stringify(jsonPayload));

    try {
      await createBook(data);
    } catch (err) {
      console.error('Erro ao tentar cadastrar livro', err);
    }

    const { modal } = this.state;

    this.setState({
      modal: {
        ...modal,
      },
    });
  }

  render() {
    const {
      form: {
        // eslint-disable-next-line no-unused-vars
        title, isbn, description, pages, edition, publishing_date, price,
      },
      hasCameraRollPermission,
      hasCameraPermission,
      preview,
      // shift,
      error,
      modal,
    } = this.state;

    const { loading } = this.props;

    return (

      <KeyboardAwareScrollView>
        <CLGradient />
        { loading
          ? (
            <View style={[{ minHeight: '100%' }]}>
              <Loading />
            </View>
          )
          : (
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

              <TextInput
                placeholder="Título"
                value={title}
                onChangeText={value => this.updateFormValue('title', value)}
                style={{ marginTop: 0 }}
              />

              <TextInput
                placeholder="ISBN-13 (Código de barras)"
                value={isbn}
                onChangeText={value => this.updateFormValue('isbn', value)}
                maxLength={13}
                keyboardType="numeric"
              />

              <TextInput
                placeholder="Descrição"
                value={description}
                multiline
                numberOfLines={2}
                onChangeText={value => this.updateFormValue('description', value)}
                style={{ height: 100 }}
              />

              <TextInput
                placeholder="Volume"
                value={edition}
                onChangeText={value => this.updateFormValue('edition', value)}
                maxLength={255}
              />

              <TextInput
                placeholder="Número de Páginas"
                value={pages}
                onChangeText={value => this.updateFormValue('pages', value)}
                maxLength={5}
                keyboardType="numeric"
              />

              <TextInput
                placeholder="Preço"
                value={price}
                onChangeText={value => this.updateFormValue('price', value)}
                maxLength={10}
                keyboardType="numeric"
              />

              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <Text style={[styles.label, { marginRight: 20 }]}>Publicação</Text>
                <DatePicker
                  date={publishing_date}
                  mode="date"
                  placeholder="Data de publicação"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  onDateChange={(date) => { this.updateFormValue('publishing_date', date); }}
                  style={{
                    flexGrow: 1,
                  }}
                  customStyles={{
                    dateInput: {
                      borderColor: '#91d7dc',
                      borderRadius: 20,
                    },
                    dateText: {
                      color: '#FFF',
                      fontSize: 18,
                    },
                  }}
                />
              </View>

              <TouchableHighlight
                style={styles.button}
                onPress={() => this.saveBook()}
              >
                <Text style={styles.text}>Salvar</Text>
              </TouchableHighlight>

              <View style={styles.errorView}>
                { error ? <Text style={styles.error}>{error}</Text> : null }
              </View>

              <Modal
                animationType="slide"
                transparent={false}
                visible={modal.modalVisible}
              >
                <View style={styles.modal}>
                  <View>
                    <Text style={styles.modalTxt}>
                      {modal.error ? modal.errorTxt : modal.okTxt}
                    </Text>

                    <TouchableHighlight
                      style={styles.modalButton}
                      onPress={() => {
                        this.setState({ modal: { ...modal, modalVisible: false } });
                      }}
                    >
                      <Text style={styles.modalButtonTxt}>Fechar</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            </View>
          )}
      </KeyboardAwareScrollView>
    );
  }
}

// export default CreateBook;

const mapStateToProps = state => ({
  loading: state.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(bookActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);
