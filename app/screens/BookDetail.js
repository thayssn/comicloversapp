import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { LinearGradient } from 'expo';
import {connect} from "react-redux";
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';

import BookDescription from '../components/BookDescription';
import BookReview from '../components/BookReview';

class BookDetail extends React.Component {
  state = {
    book: null,
    index: 0,
    routes: [
      { key: 'first', title: 'Informações' },
      { key: 'second', title: 'Anotações' },
    ],
  }

  componentWillMount(){
    console.log('books', this.props.books )
    let books = this.props.books;
    let book = books.find( book => book._id == this.props.navigation.getParam('id'))
    console.log('book', book)
    this.setState({ book })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusView}>
          <Image source={this.state.book.cover} style={styles.cover_image}/>
          <View>
            <Text style={styles.title}> { this.state.book.title}</Text>
            <Text style={styles.status}> Avaliação: {this.state.book.rating}/10</Text>
            <Text style={styles.status}> Número: {this.state.book.is_unique_edition ? `Volume Único` : this.state.book.number} </Text>
            <Text style={styles.status}> Preço: {this.state.book.price} </Text>
          </View>
        </View>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: <BookDescription item={this.state.book}/>,
            second: <BookReview item={this.state.book}/>,
          })}
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'transparent' }}
              activeColor='#80F682'
              inactiveColor='#FFF'
              pressOpacity={0}
              renderLabel={({ route, focused, color }) => (
                <Text style={{ backgroundColor: focused ? '#FC0D99' : '#FFF', margin: 8 }}>
                  {route.title}
                </Text>
              )}
            />
          }
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: 50 }}
          style={styles.container}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  cover_image: {
    width: 100,
    height: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  statusView: {
    flexDirection: 'row'
  },
  status: {
    fontSize: 16,
    fontWeight: '300'
  }
});

const mapStateToProps = state => {
  return { books : state.books  }
}

export default connect(mapStateToProps)(BookDetail)
