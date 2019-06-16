import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default BookDescription = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
    <Text style={styles.title}> Autor: {this.state.book.author} </Text>
          <Text style={styles.title}> Páginas: {this.state.book.pages} </Text>
          <Text> { this.state.book.description}</Text>
  </View>
);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  }
});
