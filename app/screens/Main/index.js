import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CollectionsList from '../../components/CollectionsList';
import BooksList from '../../components/BooksList';
import { Creators as booksActions } from '../../store/ducks/books';

class Main extends React.Component {
  state = {
    loading: true,
  }

  async componentDidMount() {
    const { fetchAllBooks } = this.props;
    await fetchAllBooks();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { books } = this.props;

    const booksWithThumbnail = books.filter(book => book.thumbnail !== null);

    const publisherCategories = booksWithThumbnail.reduce((reducedArray, next) => {
      const { publisher: { name: nextPublisherName } } = next;
      const publisherInReducedArray = reducedArray.find((publisher) => {
        const isInArray = publisher.name === nextPublisherName;
        return isInArray;
      });
      if (publisherInReducedArray) {
        publisherInReducedArray.books.push(next);
      } else {
        const newPublisherInReducedArray = {
          name: nextPublisherName,
          books: [next],
        };
        reducedArray.push(newPublisherInReducedArray);
      }
      return reducedArray;
    }, []);

    return (
      <ScrollView>
        <CollectionsList title="Minhas coleções" />
        { loading ? <Text>Loading</Text>
          : (
            <View>
              { publisherCategories.map((publisherCategory, index) => (
                <BooksList
                  key={index.toString()}
                  title={publisherCategory.name}
                  books={publisherCategory.books}
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
});

const mapDispatchToProps = dispatch => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
