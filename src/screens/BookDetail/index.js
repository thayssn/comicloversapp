import React from 'react';
import {
  Text, View, Image, TouchableOpacity, Linking,
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
import { Creators } from '../../store/ducks/activeBook';
import SelectCollections from '../../components/SelectCollections';

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
    const { getReview, book } = this.props;
    console.log(book);
    await getReview(book);
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  }

  handleRating = async (rating) => {
    const { book, setReview } = this.props;
    console.log(rating);
    await setReview(book, { rating });
  }

  handleHasBook = async () => {
    const { book, setReview } = this.props;
    console.log('b', book.review);
    await setReview(book, { has_book: book.review.has_book ? !book.review.has_book : true });
    console.log('a', book.review);
  }

  render() {
    const { book } = this.props;
    const { modalVisible } = this.state;
    const rating = book.reviews.length ? book.total_rating / book.reviews.length : 0;
    const price = book.price ? book.price.toString().replace('.', ',') : '';
    return (
      <View style={styles.container}>
        <SelectCollections modalVisible={modalVisible} setModalVisible={this.setModalVisible} />
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

          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>


          <View style={[styles.tabBar, styles.buttonWrapper]}>
            <TouchableOpacity
              style={[styles.tabItem, styles.button]}
              onPress={() => {
                this.handleHasBook();
              }}
            >
              { book.review && book.review.has_book
                ? (
                  <>
                    <CLGradient />
                    <View style={{ flexDirection: 'row' }}>
                      <Icon
                        name="md-checkmark"
                        type="ionicon"
                        color="#FFF"
                        size={14}
                      />
                      <Text style={{ color: 'white', marginLeft: 10 }}>
                      TENHO
                      </Text>
                    </View>
                  </>
                )
                : <Text style={{ color: '#20AEC0' }}>NÃO TENHO</Text>
              }
            </TouchableOpacity>
          </View>

          <View style={[styles.tabBar, styles.buttonWrapper]}>
            <TouchableOpacity
              style={[styles.tabItem, styles.button]}
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              { book.review
              && <CLGradient />}
              <Text style={{ color: 'white' }}>
                  COLEÇÕES
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.tabBar, styles.buttonWrapper]}>
            <TouchableOpacity
              style={[styles.tabItem, styles.button]}
              onPress={() => {
                Linking.openURL(`https://www.amazon.com.br/s?k=${encodeURI(`${book.title}${book.edition && `- ${book.edition}`}`)}&i=stripbooks`);
              }}
            >
              <CLGradient />
              <Text style={{ color: 'white' }}>
                  COMPRAR
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
                  rating={book.review ? book.review.rating : 0}
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
