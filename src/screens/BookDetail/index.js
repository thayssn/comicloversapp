import React from 'react';
import {
  Text, View, Image, TouchableOpacity, Modal, ScrollView, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Rating, Icon } from 'react-native-elements';

import { bindActionCreators } from 'redux';
import CLGradient from '../../components/CLGradient';
import BookDescription from '../../components/BookDescription';
import BookReview from '../../components/BookReview';
import { BASE_URL } from '../../config/env_config';
import styles from './styles';
import api from '../../services/api';
import { getUserToken } from '../../services/auth';
import CollectionThumbnail from '../../components/CollectionThumbnail';
import { Creators } from '../../store/ducks/activeBook';

class BookDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
  })

  state = {
    index: 0,
    /* eslint-disable react/no-unused-state */
    routes: [
      { key: 'first', title: 'Informações' },
      { key: 'second', title: 'Avaliação' },
    ],
    /* eslint-enable */
    // reviewRating: 0,
    modalVisible: false,
  }

  // async componentWillReceiveProps() {
  //   const { book } = this.props;
  //   try {
  //     const userToken = await getUserToken();
  //     const { rating } = await api.get(`/books/${book.id}/review`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${userToken}`,
  //         },
  //       });

  //     console.log(rating);

  //     this.setState({ reviewRating: rating });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // componentWillMount() {
  //   const { book } = this.props;
  //   this.setState({ reviewRating: book.rating });
  // }

  async componentWillMount() {
    const { getRating, book } = this.props;
    await getRating(book);
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  handleRating = async (rating) => {
    const { book, setRating } = this.props;

    await setRating(book, rating);
  }

  addBookToCollection = async (collection) => {
    const { book } = this.props;
    try {
      const userToken = await getUserToken();
      await api.post(`/collections/${collection.id}/books`, {
        books: [book.id],
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      Alert.alert(
        'Sucesso!',
        `Adicionado à coleção ${collection.title}`,
        [
          { text: 'OK', onPress: () => this.setState({ modalVisible: false }) },
        ],
        { cancelable: false },
      );
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { book, collections } = this.props;
    const { modalVisible } = this.state;
    const rating = book.reviews ? book.total_rating / book.reviews.length : 0;
    const price = book.price ? book.price.toString().replace('.', ',') : '';
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
        >
          <View style={{
            flex: 1, paddingVertical: 80, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, backgroundColor: 'rgba(0,0,0,.7)',
          }}
          >
            <View style={{
              width: '100%',
            }}
            >
              <View style={{
                marginBottom: 40,
                alignItems: 'flex-end',
              }}
              >
                <Icon
                  size={40}
                  type="ionicons"
                  name="cancel"
                  color="#FFF"
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                />
              </View>
              <ScrollView>
                <View style={{
                  flexDirection: 'row', flexWrap: 'wrap',
                }}
                >
                  { collections && collections.length
                    ? collections.map(collection => (
                      <CollectionThumbnail
                        cover={collection.thumbnail}
                        title={collection.title}
                        onPress={() => this.addBookToCollection(collection)}
                        key={collection.id.toString()}
                        titleStyle={{ color: '#FFF', fontWeight: '500', fontSize: 15 }}
                      />
                    ))
                    : <Text>Adicione um quadrinho</Text>
                }
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <View style={styles.statusView}>
          <Image
            source={{
              uri: `${BASE_URL}/${book.thumbnail}`,
            }}
            style={styles.cover_image}
          />
          <View style={styles.infoView}>
            <Text style={styles.title}>{book.title}</Text>
            <Rating
              imageSize={20}
              readonly
              startingValue={rating}
              style={styles.rating}
            />
            <Text style={styles.statusTitle}>
              Número:
              <Text style={styles.status}>{` ${book.edition ? book.edition : ''}`}</Text>
            </Text>
            <Text style={styles.statusTitle}>
              Preço:
              <Text style={styles.status}>{` R$ ${price}`}</Text>
            </Text>
            <TouchableOpacity onPress={() => {
              this.setModalVisible(true);
            }}
            >
              <Text>
                Adicionar à coleção
              </Text>

            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabWrapper}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              first: () => (<BookDescription book={book} />),
              second: () => (
                <BookReview
                  rating={book.rating}
                  onFinishRating={this.handleRating}
                />
              ),
            })}
            renderTabBar={props => (
              <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                  const { index } = this.state;
                  const isActive = index === i;
                  const color = isActive ? '#fff' : '#20AEC0';
                  return (
                    <TouchableOpacity
                      key={i.toString()}
                      style={[styles.tabItem, {
                      }]}
                      onPress={() => {
                        this.setState({ index: i });
                      }}
                    >
                      { isActive && <CLGradient /> }
                      <Text style={{ color }}>{route.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
            onIndexChange={index => this.setState({ index })}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ book: state.activeBook, collections: state.collections });

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
