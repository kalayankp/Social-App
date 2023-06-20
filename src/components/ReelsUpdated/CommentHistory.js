import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../../utils/supabase';
import { convertTimestampToHours } from '../../helper';
import { handleTime } from '../../helper';
const CommentHistory = ({ route }) => {
  const { commentId } = route.params;
  const [comment, setComment] = useState(null);

  useEffect(() => {
    const fetchCommentDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('Comment')
          .select('*')
          .eq('id', commentId)
          .single();
        
        if (error) {
          console.log('Error fetching comment details:', error);
          return;
        }

        setComment(data);
      } catch (error) {
        console.log('Error fetching comment details:', error);
      }
    };

    fetchCommentDetails();
  }, [commentId]);

  if (!comment) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading comment details...</Text>
      </View>
    );
  }

  const hours = convertTimestampToHours(comment.CreatedAt);
  const time  = handleTime(hours);

  return (
    <View style={styles.container}>
      <Text style={styles.commentText}>{comment.Body}</Text>
      <Text style={styles.createdAt}>Created at: {time} ago</Text>
      {/* Render other comment details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color : "black"
  },
  createdAt: {
    fontSize: 12,
    color: '#888',
  },
});

export default CommentHistory;
