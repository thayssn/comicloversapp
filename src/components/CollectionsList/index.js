import React from 'react';
import {
  Text, View, FlatList,
} from 'react-native';
import { connect } from 'react-redux';

import CreateCollection from '../CreateCollection';
import Collection from '../CollectionThumbnail';

import styles from './styles';

const CollectionsList = ({ collections, title }) => (
  <View style={styles.collection_list_view}>
    <Text style={styles.collection_list_title}>{title}</Text>
    <FlatList
      contentContainerStyle={styles.collection_list}
      horizontal
      data={collections}
      renderItem={({ item: collection, index }) => {
        if (index === 0) {
          return (
            <View style={{ flexDirection: 'row' }}>
              <CreateCollection createCollection={() => alert('Not implemented yet')} />
              <Collection cover={collection.cover} title={collection.title} />
            </View>
          );
        }
        return <Collection cover={collection.cover} title={collection.title} />;
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);

const mapStateToProps = state => ({
  collections: state.collections,
});

export default connect(mapStateToProps)(CollectionsList);
