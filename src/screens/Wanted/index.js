import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as wantedCreators } from '../../store/ducks/wanted';
import BooksGrid from '../../components/BooksGrid';

class MyWanted extends React.Component {
  state = {
    limit: 20,
    page: 1,
    loading: true,
  }

  componentDidMount = async () => {
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

    return (
      <View style={{
        flex: 1,
        widith: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 15,
        flexGrow: 1,
      }}
      >
        { loading ? <Text>carregando...</Text>
          : (
            <BooksGrid
              key="key-fav"
              title="Quero ter"
              books={wanted}
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
