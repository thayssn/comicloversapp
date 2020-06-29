/* eslint-disable camelcase */
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
    hasPermission: false,
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
      this.setState({ hasPermission: true });
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

  saveBook = () => {
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

    if (image) { data.append('image', image); }

    data.append('title', form.title);
    data.append('isbn', form.isbn);
    data.append('pages', form.pages);
    data.append('description', form.description);
    data.append('edition', form.edition);
    data.append('publishing_date', form.publishing_date);
    data.append('price', form.price);

    let createBookError = false;
    try {
      createBook(data);
    } catch (error) {
      console.log('POST error', error);
      createBookError = true;
    }

    const { modal } = this.state;
    this.setState({
      modal: {
        ...modal,
        error: createBookError,
        modalVisible: true,
      },
    });
  }

  render() {
    const {
      form: {
        // eslint-disable-next-line no-unused-vars
        title, isbn, description, pages, edition, publishing_date, price,
      },
      hasPermission, preview,
      // shift,
      error,
      modal,
    } = this.state;

    return (
      <KeyboardAwareScrollView>
        <CLGradient />
        <View style={styles.inner_container}>
          <View style={{ borderWidth: 1, borderColor: '#91d7dc' }}>
            { preview ? <Image style={{ width: 120, height: 180 }} source={preview} />
              : <View style={{ width: 120, height: 180 }} /> }
          </View>
          { hasPermission ? (
            <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
              <TouchableOpacity
                style={[styles.button, { padding: 5, margin: 5, fontSize: 12 }]}
                onPress={this.handleSelectImageFromGallery}
              >
                <Text style={styles.text}>Galeria</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { padding: 5, margin: 5, fontSize: 12 }]}
                onPress={this.handleSelectImageFromCamera}
              >
                <Text style={styles.text}>Tirar Foto</Text>
              </TouchableOpacity>
            </View>
          )
            : (
              <TouchableOpacity
                style={styles.button}
                onPress={this.getCameraRollPermission}
              >
                <Text style={styles.text}>Liberar permissão da câmera/galeria.</Text>
              </TouchableOpacity>
            )
                  }
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
                dateIcon: {
                },
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
                <Text style={styles.modalTxt}>{modal.error ? modal.errorTxt : modal.okTxt}</Text>

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
      </KeyboardAwareScrollView>
    );
  }
}

// export default CreateBook;

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(bookActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);
