/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  View, TouchableHighlight, Text, Animated, ScrollView, Modal,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DatePicker from 'react-native-datepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';

import {
  TextInput,
} from '../../components/Form';

import CLGradient from '../../components/CLGradient';

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
    data.append('description', form.description);
    data.append('edition', form.edition);
    data.append('publishing_date', form.publishing_date);
    data.append('price', form.price);

    let createBookError = false;
    try {
      createBook(form);
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
      // shift,
      error,
      modal,
    } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <CLGradient />
        <View style={styles.inner_container}>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={value => this.updateFormValue('title', value)}
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
