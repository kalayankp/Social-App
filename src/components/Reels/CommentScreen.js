import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Comment from './Comment';
import CommentBox from './CommentBox';
import { supabase } from '../../utils/supabase';
const CommentScreen = () => {
  const [comments, setComments] = useState([
    {
      username: 'johndoe',
      profilePic: 'https://picsum.photos/32/32',
      commentText: 'This is a great photo!',
      time: '2 hours ago',
      likes: 0,
    },
    {
      username: 'janedoe',
      profilePic: 'https://picsum.photos/32/32',
      commentText: 'Wow, stunning!',
      time: '1 hour ago',
      likes: 0,
    },
  ]);

  const renderItem = ({ item }) => (
    <Comment
      username={item.username}
      profilePic={item.profilePic}
      commentText={item.commentText}
      time={item.time}
    />
  );

  async function PostComments(comment) {
    try{
      const args = { Body: comment, IdentityID : "00000000-0000-0000-0000-000000000000", ItemID :"00000000-0000-0000-0000-000000000000" , ItemType: 2 };
      const { data, error } = await supabase  .from('Comment').insert(args);
      console.log('POSTCOMMENT', data, error);
      setComment('');
    }
    catch (error) {
      console.log('error', error);
    }
  }
  const onPostComment = (comment) => {
    const newComment = {
      username: 'johndoe',
      profilePic: 'https://picsum.photos/32/32',
      commentText: comment,
      time: 'just now',
      likes: 0,
    };
    PostComments(comment);
    setComments([...comments, newComment]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 2}
    >
      <View style={{ flex: 1 }}>
        <FlatList data={comments} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </View>
     
        <CommentBox onPostComment={onPostComment} />
      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 50,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CommentScreen;
