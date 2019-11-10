import React from 'react';

import {
  View, Text, Image, ScrollView,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators } from '../../store/ducks/activeCollection';
// import { Container } from './styles';
import { BASE_URL } from '../../config/env_config';
import BookThumbnail from '../../components/BookThumbnail';

class CollectionDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
  })

  async componentWillMount() {
    const { fetchCollection, navigation } = this.props;
    const collectionID = navigation.getParam('collectionId');
    await fetchCollection(collectionID);
  }

  render() {
    const { loading, collection, books } = this.props;
    return (
      <>
        { loading
          ? <Text>Carregando...</Text>
          : (
            <ScrollView>
              <View style={{
                padding: 10,
              }}
              >
                <View style={{ flexDirection: 'row', padding: 5, paddingBottom: 30 }}>
                  { collection.thumbnail ? (
                    <Image
                      source={{
                        uri: `${BASE_URL}/${collection.thumbnail}`,
                      }}
                      style={{ width: 150, height: 210, backgroundColor: '#ddd' }}
                    />
                  )
                    : <View style={{ width: 120, height: 180, backgroundColor: '#ddd' }} />}
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>{collection.title}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '400' }}>{collection.description}</Text>
                  </View>

                </View>
                <View style={{ padding: 5 }} />
                <Text style={{ fontSize: 15, fontWeight: '600' }}>QUADRINHOS</Text>
                <View style={{
                  flexDirection: 'row', flexWrap: 'wrap',
                }}
                >
                  { books && books.length
                    ? books.map(book => (<BookThumbnail book={book} key={book.id.toString()} />))
                    : <Text>Nenhum quadrinho adicionado.</Text>
                  }
                </View>
              </View>
            </ScrollView>
          )
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  collection: state.activeCollection,
  books: state.activeCollection.books,
  loading: state.activeCollection.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionDetail);
