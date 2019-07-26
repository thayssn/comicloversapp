import React from 'react';

import { View, Text } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators } from '../../store/ducks/activeCollection';
// import { Container } from './styles';

class CollectionDetail extends React.Component {
  async componentDidMount() {
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
              <Text>{collection.name}</Text>
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
