import React from 'react';
import { View, Text } from 'react-native';

import api from '../../services/api';
import { getUserToken } from '../../services/auth';
import BooksList from '../../components/BooksList';

class UserBooks extends React.Component {
  state = {
    loading: true,
    books: [],
  }

  fetchUserBooks = async () => {
    const userAccessToken = await getUserToken();
    const { data: books } = await api.get('me/books/',
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      });

    this.setState({
      loading: false,
      books,
    });
  }

  componentDidMount = async () => {
    await this.fetchUserBooks();
  }

  render() {
    const { books, loading } = this.state;

    return (
      <View>
        { loading ? <Text>carregando...</Text>
          : (
            <>
              <BooksList
                title="Pendentes"
                key="user-books-pending"
                books={books.filter(book => book.status === 'Pendente')}
              />
              <BooksList
                title="Aprovados"
                key="user-books-approved"
                books={books.filter(book => book.status === 'Aprovado')}
              />
              <BooksList
                title="Desaprovados"
                key="user-books-disapproved"
                books={books.filter(book => book.status === 'Desaprovado')}
              />
            </>
          )
      }
      </View>
    );
  }
}

export default UserBooks;
