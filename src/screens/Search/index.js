import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '../../store/ducks/books';
import BooksGrid from '../../components/BooksGrid';
import { TextInput, Button } from '../../components/Form';

class Search extends React.Component {
  state = {
    searchTerm: '',
    limit: 20,
    page: 0,
    loading: false,
  }

  handleChangeText = (value) => {
    this.setState({ searchTerm: value });
  }

  handleSearch = async () => {
    const { searchBooks } = this.props;
    const { searchTerm, limit, page } = this.state;

    if (!searchTerm) {
      return;
    }

    await searchBooks({ searchTerm, limit, page });
  }

  render() {
    const { books } = this.props;
    const { loading } = this.state;

    return (
      <View style={{
        justifyContent: 'center',
        padding: 15,
        flexGrow: 1,
      }}
      >
        <View
          style={{
            justifyContent: 'center',
            padding: 15,
          }}
        >
          <TextInput
            placeholder="Digite um título"
            onChangeText={this.handleChangeText}
            style={{ color: '#666' }}
          />
          <Button text="Buscar" onPress={this.handleSearch} />
        </View>
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
  books: state.books,
});

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
