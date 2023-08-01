import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Reels from '../components/ReelsUpdated/Reels';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../utils/supabase';
import Video from 'react-native-video';
import { LazyLoadComponent } from 'react-lazyload';
import { set } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      // console.log(data);
      if (error) throw error;

      const videoData = [];

      for (let index = 0; index < data.length; index++) {
        const post = data[index];
        const {data :userData  , error  :userEror } = await supabase.
        from('UserInfo')
        .select('name  , Email')
        .eq("id", post.IdentityUUID)
        .single();
      
        // console.log("from loop" , userData.name);
        const {name , Email} = userData;
        if (userEror) throw userEror;

        
        if(post.Content != null){
          videoData.push({
            id: post.id,
            videoUrls: post.Content,
            user: {
              name: name,
              Email : Email,
              avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            },
            likes: post.Likes,
            comments: post.Comments,
            description: post.Description
          })
        } 
        else{
          videoData.push({
            id: post.id,
            videoUrls: null,
            user: {
              name: name,
              avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            },
            likes: post.Likes,
            comments: post.Comments,
            description: post.Description
          })
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
    // console.log("these are final video from item ",videos);
  }, []);


  const onHeaderIconPress = () => navigation.goBack();
  const onSharePress = () => console.log('Share button pressed');
  const onCommentPress = (id) =>{
    console.log(id)
    console.log('Comment button pressed');
    navigation.navigate('Comment' ,{ postId: id })
  };
  const onLikePress = () => console.log('Like button pressed');
  const onDislikePress = () => console.log('Dislike button pressed');
  const onFinishPlaying = index => console.log(`Finished playing video ${index}`);

  const LoadingIndicator = (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );



  const [filtererData , setFiltererData] = useState('');
  async function handelfiltererData(data){
    setFiltererData(data);
    if(data  == "MyPosts"){
      // console.log("from parent" , data);
      // console.log("from parent" , filtererData);
      const user = await AsyncStorage.getItem('user_info');
      const {email , id} = JSON.parse(user);
      // console.log('User ID:', id);
      // console.log('User Email:', email);
      setVideos(videos.filter((item) => item.user.Email == email));
    }
    
    
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden={true} />
      {loading ? (
        LoadingIndicator
      ) : (
        <Reels
          videos={videos}
          backgroundColor={backgroundColor}
          fetchVideos={fetchVideos}
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
          onSendDataTogradParent={handelfiltererData}
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
