import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Reels from '../components/ReelsUpdated/Reels';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../utils/supabase';
import Video from 'react-native-video';
import { LazyLoadComponent } from 'react-lazyload';
import { set } from 'react-native-reanimated';

const headerTitle = 'My Reels';
const headerIconName = 'back';
const headerIconColor = '#fff';
const headerIconSize = 30;
const backgroundColor = '#000';
const userInfo = { name: 'John Doe', age: 25, city: 'New York' };

function ReelsScreenUpdated() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('Post').select('*').order('created_at', { ascending: false });
      console.log(data);
      if (error) throw error;

      const videoData = [];

      for (let index = 0; index < data.length; index++) {
        const post = data[index];
        let type = '';
        if (post.ContentURL != null && post.ContentURL != '') {
          type = 'Video';
          const videoObject = {
            _id: post.id,
            type: type,
            uri: post.ContentURL,
            userInfo: {
              id  : post.IdentityUUID,
            }
          };
          videoData.push(videoObject);
        } else {
          type = "Text"
          const videoObject = {
            _id: post.id,
            type: type,
            uri: post.Description,
            userInfo: {
              id  : post.IdentityUUID,}
          };
          videoData.push(videoObject);
        }
        
      }

      setVideos(videoData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const onHeaderIconPress = () => navigation.goBack();
  const onSharePress = () => console.log('Share button pressed');
  const onCommentPress = () => navigation.navigate('Comment');
  const onLikePress = () => console.log('Like button pressed');
  const onDislikePress = () => console.log('Dislike button pressed');
  const onFinishPlaying = index => console.log(`Finished playing video ${index}`);

  const LoadingIndicator = (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden={true} />
      {loading ? (
        LoadingIndicator
      ) : (
        <Reels
          videos={videos}
          backgroundColor={backgroundColor}
          headerTitle={headerTitle}
          headerIconName={headerIconName}
          headerIconColor={headerIconColor}
          headerIconSize={headerIconSize}
          onHeaderIconPress={onHeaderIconPress}
          onSharePress={onSharePress}
          onCommentPress={onCommentPress}
          onLikePress={onLikePress}
          onDislikePress={onDislikePress}
          onFinishPlaying={onFinishPlaying}
          userInfo={userInfo}
        />
      )}
    </View>
  );
}

export default ReelsScreenUpdated;

const styles = StyleSheet.create({
  loading: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
});
