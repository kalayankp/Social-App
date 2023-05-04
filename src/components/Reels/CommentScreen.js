import React, {useEffect, useState} from 'react';
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
import {supabase} from '../../utils/supabase';

const CommentScreen = () => {
  // supabase
  async function PostComments(comment) {
    try {
      const args = {
        Body: comment,
        IdentityID: '00000000-0000-0000-0000-000000000000',
        ItemID: '00000000-0000-0000-0000-000000000000',
        ItemType: 2,
      };
      const {data, error} = await supabase.from('Comment').insert(args);
      console.log('POSTCOMMENT', data, error);
    } catch (error) {
      console.log('error', error);
    }
  }
  async function GetComments() {
    try {
      let{data, error} = await supabase
        .from('Comment')
        .select('*')
        .eq('ItemType', 2)
        .order('CreatedAt', {ascending: true})
      console.log('GETCOMMENT', data, error);
      return data;
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const renderItem = ({item}) => (
    <Comment
      IdentityID={item.IdentityID}
      Body={item.Body}
      CreatedAt={item.CreatedAt}
      Likes={item.Likes}
      ItemType={item.ItemType}
      ItemID={item.ItemID}
      Upvotes={item.Upvotes}
      id = {item.id}
      onEditComment={(id)=>{
        console.log('onEditComment', id);

      }}
    />
  );

  const onPostComment = async comment => {
    const newComment = {
      username: 'johndoe',
      profilePic: 'https://picsum.photos/32/32',
      commentText: comment,
      time: 'just now',
      likes: 0,
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
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 2}>
      <View style={{flex: 1}}>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <CommentBox onPostComment={onPostComment}
            onEditComment={(id)=>{
              console.log('onEditComment', id);

            }}
            updateComment={(id)=>{
              console.log('updateComment', id);

            }
            }
            cancelEditComment={(id)=>{
              console.log('cancelEditComment', id);

            }
            }
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
