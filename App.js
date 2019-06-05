import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo';
import { Header, Icon } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <ScrollView>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        containerStyle={{
          backgroundColor: '#40B89D',
            justifyContent: 'space-around',
        }}
        />
        <View style={styles.collection_list}>
          <Text style={styles.collection_list_title}>Minhas Coleções</Text>
          <FlatList
            horizontal={true}
            data={[1, 2, 3 ,4 ,5 ,6 ,7 ,8 ,9, 10, 11, 12, 13, 14, 15]}
            renderItem={({item}) =>
            {
                if (item === 1) {
                  return <View style={[styles.collection_item, styles.collection_item_first]}>
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
                }else{
                  return <View style={styles.collection_item}></View>
                }
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
          <View style={styles.collection_list}>
  <Text style={styles.collection_list_title}>Em Alta</Text>
    <FlatList
    horizontal={true}
    data={[1, 2, 3 ,4 ,5 ,6 ,7 ,8 ,9, 10, 11, 12, 13, 14, 15]}
    renderItem={({item}) =>
  <View style={styles.collection_item}></View>
  }
    keyExtractor={(item, index) => index.toString()}
    />
    </View>
    <View style={styles.collection_list}>
  <Text style={styles.collection_list_title}>Lançamentos</Text>
    <FlatList
    horizontal={true}
    data={[1, 2, 3 ,4 ,5 ,6 ,7 ,8 ,9, 10, 11, 12, 13, 14, 15]}
    renderItem={({item}) =>
  <View style={styles.collection_item}></View>
  }
    keyExtractor={(item, index) => index.toString()}
    />
    </View>
    <View style={styles.collection_list}>
  <Text style={styles.collection_list_title}>Marvel</Text>
    <FlatList
    horizontal={true}
    data={[1, 2, 3 ,4 ,5 ,6 ,7 ,8 ,9, 10, 11, 12, 13, 14, 15]}
    renderItem={({item}) =>
  <View style={styles.collection_item}></View>
  }
    keyExtractor={(item, index) => index.toString()}
    />
    </View>
    <View style={styles.collection_list}>
  <Text style={styles.collection_list_title}>DC Comics</Text>
    <FlatList
    horizontal={true}
    title="Coleções"
    data={[1, 2, 3 ,4 ,5 ,6 ,7 ,8 ,9, 10, 11, 12, 13, 14, 15]}
    renderItem={({item, index}) =>
      <View style={styles.collection_item}></View>
  }
    keyExtractor={(item, index) => index.toString()}
    />
    </View>
    <View style={styles.collection_list}>
  <Text style={styles.collection_list_title}>Vertigo</Text>
    <FlatList
    horizontal={true}
    title="Coleções"
    data={[1, 2, 3 ,4 ,5 ,6 ,7 ,8 ,9, 10, 11, 12, 13, 14, 15]}
    renderItem={({item}) =>
  <View style={styles.collection_item}></View>
  }
    keyExtractor={(item, index) => index.toString()}
    />
    </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collection_list: {
    padding: 5
  },
  collection_list_title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5
  },
  collection_item: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    width: 100,
    height: 150,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
