import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as wantedCreators } from '../../store/ducks/wanted';
import FavBooksList from '../../components/FavBooksList';

class MyWanted extends React.Component {
  state = {
    limit: 20,
    page: 1,
    loading: true,
  }

  componentWillMount = async () => {
    const { fetchWanted } = this.props;
    const { limit, page } = this.state;

    await fetchWanted({
      limit,
      page,
    });

    this.setState({
      loading: false,
    });
  }

  render() {
    const { wanted } = this.props;
    const { loading } = this.state;

    let books = [];

    if (wanted) {
      if (Array.isArray(wanted.books) && wanted.books.length) {
        // eslint-disable-next-line prefer-destructuring
        books = wanted.books;
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
            <FavBooksList
              key="key-fav"
              title="Quero ter"
              books={books}
            />
          )
      }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  wanted: state.wanted,
});

const mapDispatchToProps = (dispatch) => {
  const wantedBindedActions = bindActionCreators(wantedCreators, dispatch);

  return { ...wantedBindedActions };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyWanted);
