import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo';
import { Header, Icon } from 'react-native-elements';
import {connect} from 'react-redux';

import Collection from './Collection';

class CollectionsList extends React.Component{
  render () {
    return (
      <View style={styles.collection_list_view}>
        <Text style={styles.collection_list_title}>{this.props.title}</Text>
        <FlatList
          contentContainerStyle={styles.collection_list}
          horizontal={true}
          data={this.props.collections}
          renderItem={({item : collection}) =>
          {
            if (collection._id === 1) {
              return <View style={{flexDirection: 'row'}}>
                <View style={[styles.collection_item, styles.collection_item_first]}>
                <LinearGradient
                  colors={['#40B89D', '#00A5E2']}
                  start={[0,0]}
                  end={[1,0]}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '100%',
                  }}
                />
                <Icon
                  name='ios-add-circle'
                  type='ionicon'
                  color='#FFF'
                  size={40}
                />
              </View>
              <Collection cover={collection.cover} title={collection.title} />
            </View>
            }else{
              return <Collection cover={collection.cover} title={collection.title}/>
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  collection_list_view: {
    padding: 5,
  },
  collection_list: {
    alignItems: 'flex-start',
  },
  collection_list_title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5
  },
  collection_item: {
    margin: 5,
    width: 100,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return ({
    collections: state.collections
  })
}

export default connect(mapStateToProps)(CollectionsList)