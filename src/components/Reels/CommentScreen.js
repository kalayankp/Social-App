import React, {useEffect} from 'react';
import {View, Text ,StyleSheet} from 'react-native';
import InputComment from './CommentComponent/InputComment';
const CommentScreen = () => {
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
    <View  
    style = {{flex:1, backgroundColor: 'white'}}
    >
        <View   style={styles.inputBox}>
          <InputComment />
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
  
  },
});

export default CommentScreen;
