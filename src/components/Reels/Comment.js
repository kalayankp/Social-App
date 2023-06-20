import React from 'react';
import { View, Text, Image, StyleSheet ,TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { convertTimestampToHours } from '../../helper';
import { handleTime } from '../../helper';
import { useEffect } from 'react';


const Comment = ({
  IdentityID,
  Body,
  CreatedAt,
  ItemType,
  ItemID,
  Upvotes,
  id,
  LastestEditAt,
  onEditComment,
  onOpenCommentHistory, // New prop for opening the CommentHistory page
}) => {
  useEffect(() => {
    console.log('comment', Body);
    console.log('comment', LastestEditAt);
  }, []);

  const hours = convertTimestampToHours(CreatedAt);
  const time = handleTime(hours);
  const profilePic = 'https://picsum.photos/200';

  const handleEditComment = () => {
    onEditComment(id);
  };

  const handleOpenCommentHistory = () => {
    onOpenCommentHistory(LastestEditAt);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.profilePic} source={{ uri: profilePic }} />
      <View style={styles.commentContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>Shivam Singh</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.commentText}>
          {Body}
          {LastestEditAt == null ? null : (
            <Text style={styles.edited} onPress={handleOpenCommentHistory}>
              (edited)
            </Text>
          )}
        </Text>
        <View style={styles.actions}>
          <Icon name="ios-heart-outline" type="ionicon" size={24} color="black" />
          <TouchableOpacity onPress={handleEditComment}>
            <Text style={styles.action}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
    color: '#000',
  },
  commentText: {
    fontSize: 14,
    lineHeight: 16,
    color: '#000',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    lineHeight: 14,
    color: '#8E8E8E',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  action: {
    fontSize: 12,
    lineHeight: 14,
    color: '#8E8E8E',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  edited: {
    fontSize: 12,
    lineHeight: 14,
    color: 'green',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },

});

export default Comment;
