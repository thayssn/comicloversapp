import React from 'react';

import {
  View, Text, Image, ScrollView, TouchableWithoutFeedback,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as activeCollectionCreators } from '../../store/ducks/activeCollection';
import { Creators as collectionsCreators } from '../../store/ducks/collections';
// import { Container } from './styles';
import { BASE_URL } from '../../config/env_config';
import BookThumbnail from '../../components/BookThumbnail';
import CLGradient from '../../components/CLGradient';

class CollectionDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
    // headerRight: <Icon
    //   name="md-create"
    //   type="ionicon"
    //   color="#FFF"
    //   size={25}
    //   underlayColor="transparent"
    //   containerStyle={{ paddingRight: 20 }}
    // />,
  })

  async componentWillMount() {
    const { fetchCollection, navigation } = this.props;
    const collectionID = navigation.getParam('collectionId');
    await fetchCollection(collectionID);
  }

  render() {
    const {
      loading, collection, books, navigation,
    } = this.props;
    return (
      <>
        { loading
          ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>carregando...</Text></View>
          : (
            <ScrollView>
              <View style={{
                padding: 10,
              }}
              >
                <View style={{
                  flexDirection: 'row', padding: 5,
                }}
                >
                  { collection.thumbnail ? (
                    <Image
                      source={{
                        uri: `${BASE_URL}/${collection.thumbnail}`,
                      }}
                      style={{ width: 150, height: 210, backgroundColor: '#ddd' }}
                    />
                  )
                    : <View style={{ width: 120, height: 180, backgroundColor: '#ddd' }} />}

                  <View style={{ paddingHorizontal: 10, flex: 1 }}>
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>{collection.title}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '400' }}>{collection.description}</Text>
                  </View>
                </View>

                <TouchableWithoutFeedback
                  style={{
                    width: 150,
                    borderColor: '#FFF',
                    borderWidth: 1,
                    borderRadius: 30,
                    marginBottom: 10,
                    marginLeft: 5,
                  }}
                  onPress={() => navigation.navigate('CreateEditCollection', { collection })}
                >
                  <CLGradient />
                  <Text style={{ color: '#FFF', padding: 5 }}>Editar</Text>
                </TouchableWithoutFeedback>
                <Text style={{ fontSize: 15, fontWeight: '600' }}>QUADRINHOS</Text>
                <View style={{
                  flexDirection: 'row', flexWrap: 'wrap',
                }}
                >
                  { books && books.length
                    ? books.map(book => (<BookThumbnail book={book} key={book.id.toString()} />))
                    : <Text style={{ fontSize: 15, fontWeight: '400', marginVertical: 10 }}>Nenhum quadrinho adicionado.</Text>
                  }
                </View>
              </View>
            </ScrollView>
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


const mapDispatchToProps = (dispatch) => {
  const activeCollectionBindedActions = bindActionCreators(activeCollectionCreators, dispatch);
  const collectionsBindedActions = bindActionCreators(collectionsCreators, dispatch);

  return { ...activeCollectionBindedActions, ...collectionsBindedActions };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionDetail);
