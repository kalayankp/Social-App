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
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommentScreen = ({ route }) => {
  const navigation = useNavigation()
  const { postId } = route.params;

  const handleOpenCommentHistory = (commentId) => {
    navigation.navigate('CommentHistory', { commentId });
  };

  async function PostComments(comment) {
    const user = await AsyncStorage.getItem('user_info');
    const { email, id } = JSON.parse(user);

    try {
      const args = {
        Body: comment,
        IdentityID: id,
        ItemID: postId,
        ItemType: 2,
      };
      const { data, error } = await supabase.from('Comment').insert(args);

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
        .eq('ItemID', postId)
        .order('CreatedAt', { ascending: true });

      return data;
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('')


  async function getName() {
    const user = await AsyncStorage.getItem('user_info');
    const { email, id } = JSON.parse(user);

    try {
      await supabase
        .from("UserInfo")
        .select("name")
        .eq("id", id)
        .then((data) => {

          setName(data.data[0].name)
        }
        )
    } catch (error) {
      console.log('error', error);
    }
  }
  useEffect(() => {

    getName()



    const fetchData = async () => {
      try {
        const data = await GetComments();
        setComments(data);
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
      LatestEditID={item.LatestEditID}
      onOpenCommentHistory={handleOpenCommentHistory}
      onEditComment={async (id, editedComment) => {

        try {
          const { data, error } = await supabase
            .from('Comment')
            .update({ Body: editedComment, LatestEditID: id })
            .eq('id', id);

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
          console.log('error', error);
        }
      }}
    />
  );
  const onPostComment = async (comment) => {

    const newComment = {
      username: name,
      profilePic: 'https://picsum.photos/32/32',
      commentText: comment,
      time: 'just now',
      likes: 0,
      Body: comment,
    };

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
