import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Comment from './Comment';
import CommentBox from './CommentBox';
import { supabase } from '../../utils/supabase';
import { useNavigation } from '@react-navigation/native';

const CommentScreen = () => {
  const navigation = useNavigation();

  const handleOpenCommentHistory = (commentId) => {
    navigation.navigate('CommentHistory', { commentId });
  };

  async function PostComments(comment) {
    try {
      const args = {
        Body: comment,
        IdentityID: '00000000-0000-0000-0000-000000000000',
        ItemID: '00000000-0000-0000-0000-000000000000',
        ItemType: 2,
      };
      const { data, error } = await supabase.from('Comment').insert(args);
      console.log('POSTCOMMENT', data, error);
    } catch (error) {
      console.log('error', error);
    }
  }

  async function GetComments() {
    try {
      const { data, error } = await supabase
        .from('Comment')
        .select('*')
        .eq('ItemType', 2)
        .order('CreatedAt', { ascending: true });

      console.log('GETCOMMENT', data, error);
      return data;
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetComments();
        setComments(data);
        console.log('data', data);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Comment
      IdentityID={item.IdentityID}
      Body={item.Body}
      CreatedAt={item.CreatedAt}
      Likes={item.Likes}
      ItemType={item.ItemType}
      ItemID={item.ItemID}
      Upvotes={item.Upvotes}
      id={item.id}
      LastestEditAt={item.LatestEditID}
      onOpenCommentHistory={handleOpenCommentHistory}
      onEditComment={async (id, editedComment) => {
        console.log('onEditComment', id);
        console.log(editedComment);
        try {
          const { data, error } = await supabase
            .from('Comment')
            .update({ Body: editedComment, LatestEditID: id })
            .eq('id', id);

          console.log(data);
          console.log(error);

          if (error) {
            throw new Error(error.message);
          }

          setComments((prevComments) => {
            return prevComments.map((comment) => {
              if (comment.id === id) {
                return { ...comment, Body: editedComment };
              }
              return comment;
            });
          });
        } catch (error) {
          console.log('Error updating comment', error);
        }
      }}
    />
  );

  const onPostComment = async (comment) => {
    const newComment = {
      username: 'johndoe',
      profilePic: 'https://picsum.photos/32/32',
      commentText: comment,
      time: 'just now',
      likes: 0,
    };
    console.log(newComment)
    await PostComments(comment);
    setComments([...comments, newComment]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 2}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <CommentBox
        onPostComment={onPostComment}
        onEditComment={(id) => {
          console.log('onEditComment', id);
        }}
        updateComment={(id) => {
          console.log('updateComment', id);
        }}
        cancelEditComment={(id) => {
          console.log('cancelEditComment', id);
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommentScreen;
