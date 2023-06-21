import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator , Text } from 'react-native';
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
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigation = useNavigation();

    // Function to load videos from URIs
    const loadVideos = async () => {
      const videoURIs = [
        'https://hvvrkmvdbhxivmykshhi.supabase.co/storage/v1/object/public/hashx-reels/video1.mov?t=2023-05-16T06%3A22%3A56.100Z',
        'https://hvvrkmvdbhxivmykshhi.supabase.co/storage/v1/object/public/hashx-reels/a%20handycaped%20farmer%20(2).jpg?t=2023-06-20T12%3A14%3A14.493Z',
        'https://hvvrkmvdbhxivmykshhi.supabase.co/storage/v1/object/public/hashx-reels/video2.mov?t=2023-05-16T06%3A23%3A04.359Z',
        // 'https://hvvrkmvdbhxivmykshhi.supabase.co/storage/v1/object/public/hashx-reels/video3.mov?t=2023-05-16T06%3A23%3A14.579Z',
        // 'https://hvvrkmvdbhxivmykshhi.supabase.co/storage/v1/object/public/hashx-reels/video4.mov?t=2023-05-16T06%3A24%3A08.285Z',
        'hello this is my first text only variation',
      ];
      const videoData = []

      for (let index = 0; index < videoURIs.length; index++) {
        const uri = videoURIs[index];
        let type = '';
    
        if (uri.startsWith('https://')) {
          if (uri.includes('.mov') || uri.includes('.mp4')) {
            type = 'Video';
          } else if (uri.includes('.jpg') || uri.includes('.png') || uri.includes('.jpeg')) {
            type = 'Image';
          }
        } else {
          type = 'Text';
        }
    
        const videoObject = {
          _id: index + 1,
          type: type,
          uri: uri,
          loading: true,
        };
    
        videoData.push(videoObject);
      }
    
      setVideos(videoData);
      setLoading(false);
    };
    useEffect(() => {
      loadVideos();
      
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
      {loading ? ( // Show the loader if loading is true
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
};  

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
