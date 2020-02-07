/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

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
    },
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
        title, isbn, description, isbn_10, pages,
      },
    } = this.state;

    return (
      <View style={styles.container}>
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

          <TextInput
            placeholder="ISBN 10"
            value={isbn_10}
            onChangeText={value => this.updateFormValue('isbn_10', value)}
            style={{ color: 'black' }}
            maxLength={10}
          />

          <TextInput
            placeholder="Número de Páginas"
            value={pages}
            onChangeText={value => this.updateFormValue('pages', value)}
            style={{ color: 'black' }}
            maxLength={5}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="Descrição"
            value={description}
            onChangeText={value => this.updateFormValue('description', value)}
            style={{ color: 'black' }}
            multiline
            numberOfLines={3}
          />

          <TouchableHighlight
            style={styles.button}
            onPress={() => this.saveBook()}
          >
            <Text style={styles.text}>Salvar</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default CreateBook;
