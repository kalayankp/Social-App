import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { IconButton, Portal, Modal } from 'react-native-paper';

const Comment = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, text: 'This is the first comment' },
    { id: 2, text: 'This is the second comment' },
    { id: 3, text: 'This is the third comment' },
  ]);
  const [showComments, setShowComments] = useState(false);

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleCommentPress = () => {
    if (comment.trim() !== '') {
      const newComment = { id: comments.length + 1, text: comment };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleCommentsModalClose = () => {
    setShowComments(false);
  };

  const renderComment = ({ item }) => {
    return <Text style={styles.commentText}>{item.text}</Text>;
  };

  return (
    <View>
      <IconButton
        icon="comment-outline"
        color="#555"
        size={24}
        onPress={() => setShowComments(true)}
        style={styles.button}
      />
      <Portal>
        <Modal
          visible={showComments}
          onDismiss={handleCommentsModalClose}
          contentContainerStyle={styles.modalContent}
        >
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.content}
          />
          <View style={styles.commentContainer}>
            <TextInput
              placeholder="Add a comment"
              value={comment}
              onChangeText={handleCommentChange}
              style={styles.input}
            />
            <IconButton
              icon="comment-outline"
              color="#555"
              size={24}
              onPress={handleCommentPress}
              style={styles.button}
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
  },
  content: {
    flexGrow: 1,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
    color:'black'
    
  },
  commentText: {
    fontSize: 16,
    padding: 10,
    color:'black'
  },
});

export default Comment;
