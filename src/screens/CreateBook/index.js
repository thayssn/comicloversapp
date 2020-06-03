/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  View, TouchableHighlight, Text, Animated, Keyboard, ScrollView, Modal,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DateTimePicker from '@react-native-community/datetimepicker';

import { TextInput } from '../../components/Form';

import styles from './styles';
import { Creators as bookActions } from '../../store/ducks/books';

class CreateBook extends Component {
  state = {
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
    // eslint-disable-next-line react/no-unused-state
    shift: new Animated.Value(0),
    error: '',
    modal: {
      modalVisible: false,
      error: false,
      errorTxt: 'Ops! Algo deu errado!',
      okTxt: 'Quadrinho cadastrado com sucesso!',
    },
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  componentDidMount = () => {
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
    const { form } = this.state;

    const data = new FormData();

    if (!form.title) {
      this.setState({ error: 'Falha ao salvar. Título obrigatório.' });
      return;
    }

    if (!form.isbn) {
      this.setState({ error: 'Falha ao salvar. ISBN obrigatório.' });
      return;
    }

    data.append('title', form.title);
    data.append('isbn', form.isbn);
    data.append('pages', form.pages);
    data.append('publishing_date', form.publishing_date);
    data.append('price', form.price);

    let deuRuim = false;
    try {
      createBook(form);
    } catch (error) {
      console.log('POST error', error);
      deuRuim = true;
    }

    const { modal } = this.state;
    this.setState({
      modal: {
        ...modal,
        error: deuRuim,
        modalVisible: true,
      },
    });
  }

  render() {
    const {
      form: {
        // eslint-disable-next-line no-unused-vars
        title, isbn, description, isbn_10, pages, edition, publishing_date, price,
      },
      // shift,
      error,
      modal,
    } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inner_container}>

          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={value => this.updateFormValue('title', value)}
            style={{ color: 'black' }}
          />

          <TextInput
            placeholder="ISBN 13"
            value={isbn}
            onChangeText={value => this.updateFormValue('isbn', value)}
            style={{ color: 'black' }}
            maxLength={13}
            keyboardType="numeric"
          />

          {/* <TextInput
            placeholder="ISBN 10"
            value={isbn_10}
            onChangeText={value => this.updateFormValue('isbn_10', value)}
            style={{ color: 'black' }}
            maxLength={10}
          /> */}

          <TextInput
            placeholder="Número de Páginas"
            value={pages}
            onChangeText={value => this.updateFormValue('pages', value)}
            style={{ color: 'black' }}
            maxLength={5}
            keyboardType="numeric"
          />

          {/* <TextInput
            placeholder="Edição"
            value={edition}
            onChangeText={value => this.updateFormValue('edition', value)}
            style={{ color: 'black' }}
            maxLength={255}
          /> */}

          <TextInput
            placeholder="Preço"
            value={price}
            onChangeText={value => this.updateFormValue('price', value)}
            style={{ color: 'black' }}
            maxLength={10}
            keyboardType="numeric"
          />

          <DateTimePicker
            style={{ width: 200 }}
            value={publishing_date} // initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="Data de publicação"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            display="calendar"
            customStyles={{
              dateInput: {
                width: '100%',
                backgroundColor: 'transparent',
                borderColor: '#91d7dc',
                borderWidth: 1,
                borderRadius: 30,
                padding: 10,
                fontSize: 18,
                textAlign: 'center',
                margin: 10,
                color: '#FFF',
                marginTop: 25,
              },
              dateText: {
                color: '#000',
              },
              placeholder: {
                color: '#91d7dc',
              },
            }}
            onChange={(event, date) => this.updateFormValue('publishing_date', date)}
          />

          {/* <TextInput
            placeholder="Descrição"
            value={description}
            onChangeText={value => this.updateFormValue('description', value)}
            style={{ color: 'black' }}
            multiline
            numberOfLines={3}
          /> */}

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
      </ScrollView>
    );
  }
}

// export default CreateBook;

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(bookActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);
