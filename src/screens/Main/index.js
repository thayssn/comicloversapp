import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CollectionsList from '../../components/CollectionsList';
import BooksList from '../../components/BooksList';
import { Creators as publicCollectionsActions } from '../../store/ducks/publicCollections';
import { Creators as collectionsActions } from '../../store/ducks/collections';
import { getUserToken } from '../../services/auth';
import api from '../../services/api';

class Main extends React.Component {
  state = {
    loading: true,
    latestBooks: [],
  }

  async componentDidMount() {
    const { fetchPublicCollections, fetchCollections } = this.props;
    const userToken = await getUserToken();

    await fetchCollections();
    await fetchPublicCollections();

    const { data: { books } } = await api.get('books', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      params: {
        limit: 15,
        whereParams: JSON.stringify({ status: 'Aprovado' }),
      },
    });

    this.setState({ loading: false, latestBooks: books });
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
    const { loading, latestBooks } = this.state;
    const { publicCollections, collections } = this.props;
    // const licensorCategories = this.getLicensorCategories(books);
    return (
      <ScrollView>
        <CollectionsList title="Minhas coleções" collections={collections} />
        { loading ? <Text>carregando...</Text>
          : (
            <View>
              <BooksList
                title="Adicionados Recentemente"
                books={latestBooks}
              />
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
