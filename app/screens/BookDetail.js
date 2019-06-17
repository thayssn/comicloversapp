import React from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';

import BookDescription from '../components/BookDescription';
import BookReview from '../components/BookReview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cover_image: {
    width: 100,
    height: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusView: {
    flexDirection: 'row',
  },
  status: {
    fontSize: 16,
    fontWeight: '300',
  },
});

class BookDetail extends React.Component {
  state = {
    book: null,
    index: 0,
    routes: [
      { key: 'first', title: 'Informações' },
      { key: 'second', title: 'Anotações' },
    ],
  }

  componentWillMount() {
    const { books, navigation } = this.props;
    this.setState({ book: books.find(b => b._id === navigation.getParam('id')) });
  }

  render() {
    const { book } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.statusView}>
          <Image source={book.cover} style={styles.cover_image} />
          <View>
            <Text style={styles.title}>{ book.title}</Text>
            <Text style={styles.status}>
              {`Avaliação: ${book.rating}`}
            </Text>
            <Text style={styles.status}>
              {`Número: ${book.is_unique_edition ? 'Volume Único' : book.number}`}
            </Text>
            <Text style={styles.status}>
              {`Preço: ${book.price}`}
            </Text>
          </View>
        </View>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: BookDescription,
            second: BookReview,
          })}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'transparent' }}
              activeColor="#80F682"
              inactiveColor="#FFF"
              pressOpacity={0}
              renderLabel={({ route, focused }) => (
                <Text style={{ backgroundColor: focused ? '#FC0D99' : '#FFF', margin: 8 }}>
                  {route.title}
                </Text>
              )}
            />
          )}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: 50 }}
          style={styles.container}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({ books: state.books });

export default connect(mapStateToProps)(BookDetail);
