import React from 'react';

import { View, Text, Image } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators } from '../../store/ducks/activeCollection';
// import { Container } from './styles';
import { BASE_URL } from '../../config/env_config';

class CollectionDetail extends React.Component {
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
            <View>
              <Image
                source={{
                  uri: `${BASE_URL}/${collection.thumbnail}`,
                }}
                style={{ width: 150, height: 200 }}
              />
              <Text>{collection.title}</Text>
              { books && (
                books.length
                  ? books.map(book => (<Text>{book.title}</Text>))
                  : <Text>Adicione algum livro</Text>
              )
            }
            </View>
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
