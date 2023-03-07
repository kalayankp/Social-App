import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Comment from './Comment';

const CommentsList = ({ comments }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Comment comment={item} />}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
});

export default CommentsList;
