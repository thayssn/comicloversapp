import React from 'react';
import {
  Text, View, Image, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Rating } from 'react-native-elements';

import CLGradient from '../../components/CLGradient';
import BookDescription from '../../components/BookDescription';
import BookReview from '../../components/BookReview';
import { BASE_URL } from '../../../env_config';
import styles from './styles';

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
    reviewRating: 0,
  }

  handleRating = (rating) => {
    this.setState({ reviewRating: rating });
  }

  render() {
    const { book } = this.props;
    const { reviewRating } = this.state;
    const rating = book.total_rating ? book.total_rating / 2 : 0;
    const price = book.price.toString().replace('.', ',');
    return (
      <View style={styles.container}>
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
              <Text style={styles.status}>{` ${book.is_unique_edition ? 'Volume Único' : book.number}`}</Text>
            </Text>
            <Text style={styles.statusTitle}>
              Preço:
              <Text style={styles.status}>{` R$ ${price}`}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.tabWrapper}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              first: () => (<BookDescription book={book} />),
              second: () => (
                <BookReview
                  rating={reviewRating}
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

const mapStateToProps = state => ({ book: state.activeBook });

export default connect(mapStateToProps)(BookDetail);
