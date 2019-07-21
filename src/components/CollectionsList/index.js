import React from 'react';
import {
  Text, View, FlatList,
} from 'react-native';
import { connect } from 'react-redux';

import { withNavigation } from 'react-navigation';
import CreateCollection from '../CreateCollection';
import Collection from '../CollectionThumbnail';

import styles from './styles';

const CollectionsList = ({ title, collections, navigation }) => (
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
              <CreateCollection onPress={() => navigation.navigate('NewCollection')} />
              <Collection cover={collection.cover} title={collection.name} />
            </View>
          );
        }
        return <Collection cover={collection.cover} title={collection.name} />;
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);

const mapStateToProps = state => ({
  collections: state.collections,
});

export default connect(mapStateToProps)(withNavigation(CollectionsList));
