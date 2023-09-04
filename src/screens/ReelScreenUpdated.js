import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, ActivityIndicator, Text,Alert, Share } from 'react-native';
import Reels from '../components/ReelsUpdated/Reels';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../utils/supabase';
import Video from 'react-native-video';
import { LazyLoadComponent } from 'react-lazyload';
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
      console.log(data,"supdasedataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      if (error) throw error;

      const videoData = [];

      for (let index = 0; index < data.length; index++) {
        const post = data[index];
        const {data :userData  , error  :userEror } = await supabase.
        from('UserInfo')
        .select('name  , Email, profile_image_url')
        .eq("id", post.IdentityUUID)
        .single();
      
        // console.log("from loop" , userData.name);
        const {name , Email, profile_image_url} = userData;
        if (userEror) throw userEror;
console.log(profile_image_url,"imgggggggggggggggggg")
const NoProfilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvQmR2Qrof1aCENRuX8QfnvkqGnN35FByfxeFn4FE&s"  


        if(post.Content != null){
          videoData.push({
            id: post.id,
            videoUrls: post.Content,
            user: {
              name: name,
              Email : Email,
           
             avatar: profile_image_url !== null ? profile_image_url  : NoProfilePic 
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
              avatar: profile_image_url !== null ? profile_image_url  : NoProfilePic 
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
  }, []);


  const onHeaderIconPress = () => navigation.goBack();
  const onShare = async (id) => {
    try {
      const info  =  supabase.from('Post').select('*').eq('id', id);
      const {data , error} = await info.single();
      if (error) throw error;
      console.log(data);
      const {Content , Description} = data;
      console.log(Content);
      console.log(Description);
      if (Content != null){
    const result = await Share.share({
      title: "Hashx",
      message: ` ${Description}  ${data.Content[0].url}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log(`Shared with activity type: ${result.activityType}`);
      } else {
        console.log('Shared without a specific activity type');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  }else{
    const result = await Share.share({
      title: "Hashx",
      message: ` Description  :    ${Description}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log(`Shared with activity type: ${result.activityType}`);
      } else {
        console.log('Shared without a specific activity type');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  }
  } catch (error) {
    Alert.alert(error.message);
  }
};

const onSharePress = (id) => {
          console.log('Share button pressed')
          onShare(id);
        };

  const onCommentPress = (id) =>{
    console.log(id)
    console.log('Comment button pressed');
    navigation.navigate('Comment' ,{ postId: id })
  };
  const onLikePress = () => console.log('Like button pressed');
  

  // onContractPress
  const onDislikePress = (id) => {
    console.log(id)
    navigation.navigate('ShowContract', { postId: id })
  }


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
      const user = await AsyncStorage.getItem('user_info');
      const {email , id} = JSON.parse(user);
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