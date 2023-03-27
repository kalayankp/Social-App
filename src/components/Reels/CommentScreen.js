import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import CommentsList from './CommentsList';
import CommentBox from './CommentBox';
import supabase from '../../../superbase/superbase';
import ClickableTextButton from './ClickableTextButton';
const CommentScreen = () => {
  const postComment = async (Body, IdentityID, ItemID) => {
    const args = {Body, IdentityID, ItemID, ItemType: 2};
    const {data, error} = await supabase.from('Comments').insert(args);
    console.log('POSTCOMMENT', data, error);
    return data;
  };

  const comments = [
    {
      id: 1,
      comment: 'This is a comment',
      user: {
        id: 'u1',
        username: 'Davide',
        imageUri:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
      },
    },
  ];
  return (
    <View>
      <CommentsList comments={comments} />
      <CommentBox ItemID={2} />
      {/* <ClickableTextButton onPress={postComment} buttonText={'post'}/> */}
    </View>
  );
};

export default CommentScreen;
