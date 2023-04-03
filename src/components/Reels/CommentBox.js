import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet ,Modal} from 'react-native';

import { Icon } from 'react-native-elements';
import EmojiModal from 'react-native-emoji-modal';

const CommentBox = (props) => {
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

  const postButton = () => {
    props.onPostComment(comment);
    setComment('');
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
          <Modal  visible={showEmojiPicker} transparent={true} animationType="slide" onRequestClose={toggleEmojiPicker} style={styles.Modal}
          >
          <EmojiModal
            onEmojiSelected={handleAddEmoji}
            rows={7}
            localizedCategories={[ 
              'Smileys and emotion',
              'People and body',
              'Animals and nature',
              'Food and drink',
              'Activities',
              'Travel and places',
              'Objects',
              'Symbols',
            ]}
            onPressOutside={toggleEmojiPicker}
            />
            
      </Modal>  
        </View>
      )}
      <TouchableOpacity style={styles.postButton} 
      onPress={postButton}>
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
  Modal:{
    // stick to input box
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    }
});


export default CommentBox;

