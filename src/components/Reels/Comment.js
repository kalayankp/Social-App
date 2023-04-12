import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
const Comment = ({ username, profilePic, commentText, time, onEditComment, onDeleteComment }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.profilePic} source={{ uri: profilePic }} />
      <View style={styles.commentContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.commentText}>{commentText}</Text>
        <View style={styles.actions}>
        <Icon name="ios-heart-outline" type="ionicon" size={24} color="black" />
          <Text style={styles.action} onPress={onEditComment}>Edit</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
    color: '#000',
  },
  commentText: {
    fontSize: 14,
    lineHeight: 16,
    color: '#000',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    lineHeight: 14,
    color: '#8E8E8E',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  action: {
    fontSize: 12,
    lineHeight: 14,
    color: '#8E8E8E',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
});

export default Comment;
