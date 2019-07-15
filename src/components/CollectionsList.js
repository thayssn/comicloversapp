import React from 'react';
import {
  StyleSheet, Text, View, FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import Collection from './Collection';
import CLGradient from './CLGradient';

const styles = StyleSheet.create({
  collection_list_view: {
    padding: 5,
  },
  collection_list: {
    alignItems: 'flex-start',
  },
  collection_list_title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
  },
  collection_item: {
    margin: 5,
    width: 100,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CollectionsList = ({ collections, title }) => (
  <View style={styles.collection_list_view}>
    <Text style={styles.collection_list_title}>{title}</Text>
    <FlatList
      contentContainerStyle={styles.collection_list}
      horizontal
      data={collections}
      renderItem={({ item: collection }) => {
        if (collection._id === 1) {
          return (
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.collection_item, styles.collection_item_first]}>
                <CLGradient />
                <Icon
                  name="ios-add-circle"
                  type="ionicon"
                  color="#FFF"
                  size={40}
                />
              </View>
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
