import React from 'react';
import { ScrollView } from 'react-native';

import CollectionsList from '../components/CollectionsList';
import BooksList from '../components/BooksList';

const Main = () => (
  <ScrollView>
    <CollectionsList title="Minhas coleções" />
    <BooksList title="Em Alta" />
    <BooksList title="Marvel" />
    <BooksList title="DC" />
    <BooksList title="Vertigo" />
    <BooksList title="Recomendados" />
  </ScrollView>
);

export default Main;
