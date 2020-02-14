/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  View, TouchableHighlight, Text, Animated, Keyboard, ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

import { TextInput } from '../../components/Form';

import styles from './styles';

class CreateBook extends Component {
  state = {
    forms: {
      title: null,
      isbn: null,
      isbn_10: null,
      description: null,
      pages: null,
      edition: null,
      publishing_date: null,
      price: null,
    },
    // eslint-disable-next-line react/no-unused-state
    shift: new Animated.Value(0),
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

  }

  render() {
    const {
      forms: {
        // eslint-disable-next-line no-unused-vars
        title, isbn, description, isbn_10, pages, edition, publishing_date, price,
      },
      // shift,
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
        </View>
      </ScrollView>
    );
  }
}

export default CreateBook;
