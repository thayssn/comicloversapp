import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as publicCollectionsActions } from '../../store/ducks/publicCollections';
import { Creators as collectionsActions } from '../../store/ducks/collections';
import CreateCollection from '../../components/CreateCollection';
import Collection from '../../components/CollectionThumbnail';

class MyCollections extends React.Component {
  state = {
  }

  getLicensorCategories = books => books.reduce((reducedArray, next) => {
    const nextLicensorName = next.licensors[0] ? next.licensors[0].name : '---';
    const licensorInReducedArray = reducedArray.find((licensor) => {
      const isInArray = licensor.name === nextLicensorName;
      return isInArray;
    });

    if (licensorInReducedArray) {
      licensorInReducedArray.books.push(next);
    } else {
      const newLicensorInReducedArray = {
        name: nextLicensorName,
        books: [next],
      };
      reducedArray.push(newLicensorInReducedArray);
    }
    return reducedArray;
  }, [])

  render() {
    const { collections, navigation } = this.props;
    return (
      <ScrollView>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyItems: 'space-between',
          justifyContent: 'start',
          alignItems: 'flex-start',
          padding: 15,
        }}
        >
          <CreateCollection onPress={() => navigation.navigate('CreateEditCollection')} />
          {collections.map(collection => (
            <Collection
              key={collection.id}
              cover={collection.thumbnail}
              title={collection.title}
              onPress={() => navigation.navigate('CollectionDetail', { collectionId: collection.id, title: collection.title })}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
  collections: state.collections,
});

const mapDispatchToProps = (dispatch) => {
  const publicCollectionsBindedActions = bindActionCreators(publicCollectionsActions, dispatch);
  const collectionsBindedActions = bindActionCreators(collectionsActions, dispatch);

  return { ...publicCollectionsBindedActions, ...collectionsBindedActions };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCollections);
