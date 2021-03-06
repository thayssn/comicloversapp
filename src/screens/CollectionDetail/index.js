import React from 'react';

import {
  View, Text, Image, ScrollView, TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as activeCollectionCreators } from '../../store/ducks/activeCollection';
import { Creators as collectionsCreators } from '../../store/ducks/collections';
import { Creators as bookCreators } from '../../store/ducks/activeBook';
// import { Container } from './styles';
import { BASE_URL } from '../../config/env_config';
import BookThumbnail from '../../components/BookThumbnail';
import CLGradient from '../../components/CLGradient';

class CollectionDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
    headerRight: <Icon
      name={navigation.getParam('editMode') ? 'md-checkmark' : 'md-create'}
      type="ionicon"
      color="#FFF"
      size={25}
      underlayColor="transparent"
      containerStyle={{ paddingRight: 20 }}
      onPress={navigation.getParam('handlePress')}
    />,
  })

  state = {
    editMode: false,
  }

  async componentDidMount() {
    const { fetchCollection, navigation } = this.props;
    const collectionID = navigation.getParam('collectionId');
    await fetchCollection(collectionID);

    navigation.setParams({
      handlePress: () => {
        const { editMode } = this.state;
        this.setState({ editMode: !editMode });
        navigation.setParams({ editMode: !editMode });
      },
    });
  }

  render() {
    const {
      loading, collection, books, navigation, removeBook, removeFromCollection,
    } = this.props;
    const { editMode } = this.state;
    return (
      <>
        { loading
          ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>carregando...</Text>
            </View>
          )
          : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{
                padding: 10,
              }}
              >
                <View style={{
                  flexDirection: 'row', padding: 5,
                }}
                >
                  <View>
                    { collection.thumbnail ? (
                      <Image
                        source={{
                          uri: `${BASE_URL}/${collection.thumbnail}`,
                        }}
                        style={{ width: 150, height: 210, backgroundColor: '#ddd' }}
                      />
                    )
                      : <View style={{ width: 150, height: 210, backgroundColor: '#ddd' }} />}

                    <TouchableWithoutFeedback
                      onPress={() => !editMode && navigation.navigate('CreateEditCollection', { collection })}
                    >
                      <View style={{
                        borderColor: '#FFF',
                        borderWidth: 1,
                        borderRadius: 15,
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        overflow: 'hidden',
                        justifyContent: 'center',
                      }}
                      >
                        <CLGradient />
                        <Icon
                          name="md-create"
                          type="ionicon"
                          color="#FFF"
                          size={15}
                        />
                        <Text style={{ color: '#FFF', padding: 5 }}>Editar</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>

                  <View style={{ paddingHorizontal: 10, flex: 1 }}>
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>{collection.title}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '400' }}>{collection.description}</Text>
                  </View>
                </View>

                <Text style={{ fontSize: 15, fontWeight: '600' }}>QUADRINHOS</Text>
                { editMode
                && <Text style={{ fontSize: 15 }}>Editando quadrinhos desta coleção </Text>}
                <View style={{
                  flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start',
                }}
                >
                  { books && books.length
                    ? books.map(book => (
                      <View key={book.id.toString()} style={{ width: '33.33%' }}>
                        <BookThumbnail book={book} />

                        { editMode
                        && (
                          <TouchableWithoutFeedback
                            onPress={() => {
                              removeBook(book.id);
                              removeFromCollection(book, collection);
                            }
                          }
                          >
                            <View style={{
                              borderRadius: 30,
                              backgroundColor: '#C22',
                              position: 'absolute',
                              top: 10,
                              right: 10,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            >
                              <Icon
                                name="ios-close"
                                type="ionicon"
                                color="#FFF"
                                size={30}
                                containerStyle={{ height: 30, width: 30 }}
                              />
                            </View>
                          </TouchableWithoutFeedback>
                        )}
                      </View>
                    ))
                    : (
                      <Text style={{ fontSize: 15, fontWeight: '400', marginVertical: 10 }}>
                      Nenhum quadrinho adicionado.
                      </Text>
                    )
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
  const bookBindedActions = bindActionCreators(bookCreators, dispatch);

  return { ...activeCollectionBindedActions, ...collectionsBindedActions, ...bookBindedActions };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionDetail);
