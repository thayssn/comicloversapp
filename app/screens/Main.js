import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo';
import { Header, Icon } from 'react-native-elements';

import CollectionsList from '../components/CollectionsList'
import BooksList from '../components/BooksList'

export default class Main extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Comic lovers!",
  });

  render() {
    return (
      <ScrollView>
        <CollectionsList  title="Minhas coleções"/>
        <BooksList title="Em Alta"/>
        <BooksList title="Marvel" />
        <BooksList title="DC"/>
        <BooksList title="Vertigo"/>
        <BooksList title="Recomendados"/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collection_list: {
    padding: 5
  },
  collection_list_title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5
  },
  collection_item: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    width: 100,
    height: 150,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
