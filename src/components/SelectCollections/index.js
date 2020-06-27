import React from 'react';
import {
  Text, View, Modal, ScrollView,
  // Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import { bindActionCreators } from 'redux';
import CollectionThumbnail from '../CollectionThumbnail';
import { Creators } from '../../store/ducks/activeBook';

class SelectCollections extends React.Component {
  state = {
    bookCollections: [],
  }

  componentDidMount() {
    const { book } = this.props;
    this.setState({ bookCollections: book.collections });
  }

  addBookToCollection = async (collection) => {
    const { book, addToCollection } = this.props;
    const { bookCollections } = this.state;
    try {
      await addToCollection(book, collection);
      this.setState({ bookCollections: [...bookCollections, collection] });
      // Alert.alert(
      //   'Sucesso!',
      //   `Adicionado à coleção ${collection.title}`,
      //   [
      //     { text: 'OK' },
      //   ],
      //   { cancelable: false },
      // );
    } catch (err) {
      console.log(err);
    }
  }

  removeBookFromCollection = async (collection) => {
    const { book, removeFromCollection } = this.props;
    const { bookCollections } = this.state;
    try {
      await removeFromCollection(book, collection);
      const filteredBookCollections = bookCollections.filter(col => col.id !== collection.id);
      this.setState({ bookCollections: filteredBookCollections });
      // Alert.alert(
      //   'Removido',
      //   `Removido da coleção ${collection.title}`,
      //   [
      //     { text: 'OK' },
      //   ],
      //   { cancelable: false },
      // );
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      collections, modalVisible, setModalVisible,
    } = this.props;
    const { bookCollections } = this.state;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
      >
        <View style={{
          flex: 1, paddingVertical: 0, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 0, backgroundColor: 'rgba(0,0,0,.9)',
        }}
        >
          <View style={{
            width: '100%',
            height: '100%',
            padding: 15,
          }}
          >
            <View style={{
              marginTop: 20,
              marginBottom: 20,
              alignItems: 'center',
            }}
            >
              <Text style={{ color: '#FFF', fontSize: 20 }}>Minhas coleções</Text>

              <Icon
                size={30}
                type="ionicons"
                name="cancel"
                color="#FFF"
                onPress={() => {
                  setModalVisible(false);
                }}
                containerStyle={{ position: 'absolute', top: 0, right: 0 }}
              />
            </View>
            <ScrollView>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: 15,
              }}
              >
                { collections && collections.length
                  ? collections.map((collection) => {
                    const isInCollection = bookCollections.find(col => col.id === collection.id);
                    return (
                      <CollectionThumbnail
                        cover={collection.thumbnail}
                        title={collection.title}
                        onPress={() => {
                          if (isInCollection) {
                            this.removeBookFromCollection(collection);
                          } else {
                            this.addBookToCollection(collection);
                          }
                        }}
                        key={collection.id.toString()}
                        titleStyle={{
                          color: '#FFF', fontWeight: '500', fontSize: 15,
                        }}
                        hasCollection={!!isInCollection}
                        listing={false}
                      />
                    );
                  })
                  : (
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Text style={{ color: '#FFF', fontSize: 20 }}>Adicione uma coleção</Text>
                      <Text style={{ color: '#FFF', fontSize: 14 }}>Texto explicativo</Text>
                    </View>
                  )
            }
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({ book: state.activeBook, collections: state.collections });

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SelectCollections);
