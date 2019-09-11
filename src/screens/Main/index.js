import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CollectionsList from '../../components/CollectionsList';
import BooksList from '../../components/BooksList';
import { Creators as publicCollectionsActions } from '../../store/ducks/publicCollections';
import { Creators as collectionsActions } from '../../store/ducks/collections';

class Main extends React.Component {
  state = {
    loading: true,
  }

  async componentWillMount() {
    const { fetchPublicCollections, fetchCollections } = this.props;
    // await fetchAllBooks();
    await fetchCollections();
    await fetchPublicCollections();
    this.setState({ loading: false });
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
    const { loading } = this.state;
    const { publicCollections, collections } = this.props;
    // const licensorCategories = this.getLicensorCategories(books);
    return (
      <ScrollView>
        <CollectionsList title="Minhas coleções" collections={collections} />
        { loading ? <Text>Carregando...</Text>
          : (
            <View>
              { publicCollections && publicCollections.map((collection, index) => (
                <BooksList
                  key={index.toString()}
                  title={collection.title}
                  books={collection.books}
                />
              ))
              }
            </View>
          )
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
  publicCollections: state.publicCollections,
});

const mapDispatchToProps = (dispatch) => {
  const publicCollectionsBindedActions = bindActionCreators(publicCollectionsActions, dispatch);
  const collectionsBindedActions = bindActionCreators(collectionsActions, dispatch);

  return { ...publicCollectionsBindedActions, ...collectionsBindedActions };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
