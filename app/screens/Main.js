import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo';

import CollectionsList from '../components/CollectionsList'
import BooksList from '../components/BooksList'

export default class Main extends React.Component {

  render() {
    return (
      <ScrollView>
        <CollectionsList  title="Minhas coleções" navigation={this.props.navigation}/>
        <BooksList title="Em Alta" navigation={this.props.navigation}/>
        <BooksList title="Marvel" navigation={this.props.navigation}/>
        <BooksList title="DC" navigation={this.props.navigation}/>
        <BooksList title="Vertigo" navigation={this.props.navigation}/>
        <BooksList title="Recomendados" navigation={this.props.navigation}/>
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
