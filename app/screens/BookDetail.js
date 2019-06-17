import React from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';

import CLGradient from '../components/CLGradient';
import BookDescription from '../components/BookDescription';
import BookReview from '../components/BookReview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover_image: {
    width: 100,
    height: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoView: {
    flex: 1,
    paddingLeft: 15,
  },
  statusView: {
    flexDirection: 'row',
    padding: 15,
  },
  status: {
    fontSize: 16,
    fontWeight: '300',
  },
  tabWrapper: {
    flex: 1,
    padding: 15,
  },
  tabBar: {
    width: '100%',
    flexDirection: 'row',
    borderColor: '#20AEC0',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tabItem: {
    height: 40,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class BookDetail extends React.Component {
  state = {
    index: 0,
    /* eslint-disable react/no-unused-state */
    routes: [
      { key: 'first', title: 'Informações' },
      { key: 'second', title: 'Avaliação' },
    ],
    /* eslint-enable */
  }

  render() {
    const { book } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.statusView}>
          <Image source={book.cover} style={styles.cover_image} />
          <View style={styles.infoView}>
            <Text style={styles.title}>{book.title}</Text>
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
        <View style={styles.tabWrapper}>

          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              first: () => (<BookDescription book={book} />),
              second: () => (<BookReview book={book} />),
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
                      onPress={() => this.setState({ index: i })}
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
