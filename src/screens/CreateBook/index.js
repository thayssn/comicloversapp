/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  View, TouchableHighlight, Text, Animated, Keyboard, ScrollView, Modal,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DatePicker from 'react-native-datepicker';

import { TextInput } from '../../components/Form';

import styles from './styles';
import { Creators as bookActions } from '../../store/ducks/books';

class CreateBook extends Component {
  state = {
    forms: {
      title: '',
      isbn: '',
      isbn_10: '',
      description: '',
      pages: '',
      edition: '',
      publishing_date: '',
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

  updateFormValue = (key, value) => {
    const { forms } = this.state;

    this.setState({
      forms: {
        ...forms,
        [key]: value,
      },
    });
  }

  saveBook = () => {
    const { createBook } = this.props;
    const { forms } = this.state;

    const data = new FormData();

    if (!forms.title) {
      this.setState({ error: 'Falha ao salvar. Título obrigatório.' });
      return;
    }

    if (!forms.isbn) {
      this.setState({ error: 'Falha ao salvar. ISBN obrigatório.' });
      return;
    }

    data.append('title', forms.title);
    data.append('isbn', forms.isbn);
    data.append('pages', forms.pages);
    data.append('publishing_date', forms.publishing_date);
    data.append('price', forms.price);

    let deuRuim = false;
    try {
      createBook(data);
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
      forms: {
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

          <DatePicker
            style={{ width: 200 }}
            date={publishing_date} // initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="Data de publicação"
            format="DD-MM-YYYY"
            minDate="01-01-1900"
            maxDate="01-01-2050"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
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
            onDateChange={value => this.updateFormValue('publishing_date', value)}
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
