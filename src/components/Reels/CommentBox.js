import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';
import EmojiSelector from 'react-native-emoji-selector';


const CommentBox = () => {
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleAddEmoji = (emoji) => {
    setComment(comment + emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a comment..."
          value={comment}
          onChangeText={handleCommentChange}
          style={styles.input}
        />
        <TouchableOpacity onPress={toggleEmojiPicker}>
          <Icon name="ios-heart-outline" type="ionicon" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {showEmojiPicker && (
        <View style={styles.emojiPickerContainer}>
          <EmojiSelector onEmojiSelected={handleAddEmoji} />
        </View>
      )}
      <TouchableOpacity style={styles.postButton}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'gray',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: 'black',
  },
  postButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'orange',
    marginLeft: 16,
    
  },
  postButtonText: {
    color: 'black',
    fontSize: 16,
  },
  emojiPickerContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
});


export default CommentBox;

