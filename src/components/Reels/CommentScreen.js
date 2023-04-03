import React, {useEffect} from 'react';
import {View, Text ,StyleSheet,FlatList} from 'react-native';
import Comment from './Comment';
import CommentBox from './CommentBox';
const CommentScreen = () => {
  const comments = [
  {
    username: 'johndoe',
    profilePic: 'https://picsum.photos/32/32',
    commentText: 'This is a great photo!',
    time: '2 hours ago',
    likes : 0,
  },
  {
    username: 'janedoe',
    profilePic: 'https://picsum.photos/32/32',
    commentText: 'Wow, stunning!',
    time: '1 hour ago',
    likes : 0,
  },
];

  const renderItem = ({ item }) => (
    <Comment
      username={item.username}
      profilePic={item.profilePic}
      commentText={item.commentText}
      time={item.time}
    />
  );
  return (
    <View  
    style = {{flex:1, backgroundColor: 'white'}}
    >
       <View>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
        <View style={styles.inputBox}>
          <CommentBox/>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  
});

export default CommentScreen;
