
import React, { useState } from 'react';
import { View, Text, StyleSheet ,Modal } from 'react-native';
import { Avatar, Icon, Button, Input } from 'react-native-elements';
const Comment = ({ comment }) => {
  const [reaction, setReaction] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(true);
  const [popup , setPopup] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReaction = (reactionType) => {
    setReaction(reactionType);
    
  };

  const handleReply = () => {
    setShowReplyForm(true);
  };
  const handelEdit = () => {
    setPopup(true);
    setShowEditForm(false);
  }
  const handleCancelEdit = () => {
    setShowEditForm(true);
    setReplyText('');
  };
  const handleCancelReply = () => {
    setShowReplyForm(false);
    setReplyText('');
  };
  

  const handleSendReply = () => {
    // Add code here to send the reply to the server
    setShowReplyForm(false);
    setReplyText('');
  };

  return (
    <View style={styles.container}>
       
      <Avatar
        rounded
        source={{
          uri: comment.user.imageUri,
        }}
        size="small"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{comment.user.name}</Text>
          <Button
            type="clear"
            icon={<Icon name="heart" type="font-awesome" color="#FF6C70" />}
            onPress={() => handleReaction('like')}
            containerStyle={styles.reactionButton}
          />
          <Button
            type="clear"
            icon={<Icon name="thumbs-up" type="font-awesome" color="#5F7AFF" />}
            onPress={() => handleReaction('thumbsUp')}
            containerStyle={styles.reactionButton}
          />
         
          
          {/* Add more reaction buttons here */}
          <Button
            type="clear"
            icon={<Icon name="edit" type="font-awesome" color="#5F7AFF" />}
            onPress={() => handelEdit()}
            containerStyle={styles.reactionButton}
          />
          <Button
            type="clear"
            title="Reply"
            onPress={handleReply}
            containerStyle={styles.replyButton}
          />
        </View>
        {showEditForm ?<Text style={styles.text}>{comment.text}</Text> : (
          <View style={styles.replyForm}>
           
            <Input
              value={comment.text}
              onChangeText={setReplyText}
              autoFocus
            />
            <View style={styles.replyFormButtons}>
              <Button
                title="Cancel"
                onPress={handleCancelEdit}
                containerStyle={styles.replyFormButton}
              />
              <Button
                title="Send"
                onPress={handleCancelEdit}
                containerStyle={styles.replyFormButton}
              />
            </View>
          </View>
        )}
        
          {/* {comment.replys.map((reply) => (
            <View key={reply.id} style={styles.container}>
              <Avatar

                rounded
                source={{
                  uri: reply.user.avatar,
                }}
                size="small"
              />
              <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.name}>{reply.user.name}</Text>
                </View>
                <Text style={styles.text}>{reply.reply}</Text>
              </View>
            </View>
          ))} */}
        {showReplyForm && (
          <View style={styles.replyForm}>
            <Input
              placeholder="Type your reply here..."
              value={replyText}
              onChangeText={setReplyText}
              autoFocus
            />
            <View style={styles.replyFormButtons}>
              <Button
                title="Cancel"
                onPress={handleCancelReply}
                containerStyle={styles.replyFormButton}
              />
              <Button
                title="Send"
                onPress={handleSendReply}
                containerStyle={styles.replyFormButton}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
  },
  content: {
    marginLeft: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  text: {
    marginTop: 5,
  },
  reactionButton: {
    marginLeft: 5,
    marginHorizontal: 5,
  },
  replyButton: {
    marginLeft: 'auto',
  },
  replyForm: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
  },
  replyFormButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  replyFormButton: {
    marginLeft: 10,
  },
});
export default Comment;