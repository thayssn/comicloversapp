import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as favoritesCreators } from '../../store/ducks/favorites';
import BooksGrid from '../../components/BooksGrid';

class MyFavorites extends React.Component {
  state = {
    limit: 20,
    page: 1,
    loading: true,
  }

  componentWillMount = async () => {
    const { fetchFavorites } = this.props;
    const { limit, page } = this.state;

    await fetchFavorites({
      limit,
      page,
    });

    this.setState({
      loading: false,
    });
  }

  render() {
    const { favorites } = this.props;
    const { loading } = this.state;

    let books = [];

    if (favorites) {
      if (Array.isArray(favorites.books) && favorites.books.length) {
        // eslint-disable-next-line prefer-destructuring
        books = favorites.books;
      }
    }

    return (
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 15,
        flexGrow: 1,
      }}
      >
        { loading ? <Text>carregando...</Text>
          : (
            <BooksGrid
              key="key-fav"
              title="Favoritos"
              books={books}
            />
          )
      }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => {
  const favoritesBindedActions = bindActionCreators(favoritesCreators, dispatch);

  return { ...favoritesBindedActions };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFavorites);
