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
    <Text
      style={styles.collection_list_title}
      onPress={() => { navigation.navigate('MyCollections'); }}
    >
      {title}
    </Text>

    <View style={{ flexDirection: 'row' }}>

      { collections.length
        ? (
          <FlatList
            contentContainerStyle={styles.collection_list}
            horizontal
            data={collections.slice(0, 5)}
            renderItem={({ item: collection, index }) => (
              <View style={{ flexDirection: 'row' }}>
                { index === 0
                  && <CreateCollection onPress={() => navigation.navigate('CreateEditCollection')} />
                }
                <Collection
                  cover={collection.thumbnail}
                  title={collection.title}
                  onPress={() => navigation.navigate('CollectionDetail', { collectionId: collection.id, title: collection.title })}
                />
              </View>
            )}

            keyExtractor={(item, index) => index.toString()}
          />
        )
        : <CreateCollection onPress={() => navigation.navigate('CreateEditCollection')} />
    }

    </View>
  </View>
);

const mapStateToProps = state => ({
  collections: state.collections,
});

export default connect(mapStateToProps)(withNavigation(CollectionsList));
