import React , {useEffect} from 'react';
import {View ,StatusBar , StyleSheet , Image} from 'react-native';
import Reels from  '../components/ReelsUpdated/Reels'
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../utils/supabase';
import Video from 'react-native-video';
function ReelsScreenUpdated() {

async function getvideo () {
 const data =  await supabase
 .storage.from('hashx-reels')
 .getPublicUrl('cardlook.jpeg')
//  from('hashx-reels').download('cardlook.jpeg')
 console.log(data)
//  return data
console.log(data.data.publicUrl)
setData(data.data.publicUrl)
return data
}


async function getlisting () {
let { data, error } = await supabase
.from('ActiveListing')
.select('*')
console.log(data)
}

useEffect(() => {
  getlisting()
  // console.log(c)
  // setData(c)
}, [])

  

  
      const videos = [
        { _id: '1', uri: require('../asset/Assets/video2.mov')},
        { _id: '2', uri: require('../asset/Assets/video3.mov') },
        { _id: '3', uri:  require('../asset/Assets/video4.mov') },
      ];
  const headerTitle = 'My Reels';
  const headerIconName = 'back';
  const headerIconColor = '#fff';
  const headerIconSize = 30;
  const backgroundColor = '#000';
  const onHeaderIconPress = () => console.log('Header icon pressed');
  const onSharePress = () => console.log('Share button pressed');
  const onCommentPress = () =>navigation.navigate('Comment')
  const onLikePress = () => console.log('Like button pressed');
  const onDislikePress = () => console.log('Dislike button pressed');
  const onFinishPlaying = index => console.log(`Finished playing video ${index}`);
  const userInfo = { name: 'John Doe', age: 25, city: 'New York' };
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#000' }}>
        <StatusBar hidden={true} />
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
      onFinishPlaying={onFinishPlaying}
      userInfo={userInfo}
    />

{/* <Video
        source={{ uri: 'https://hvvrkmvdbhxivmykshhi.supabase.co/storage/v1/object/public/hashx-reels/the%20creative%20tech%20club%20of%20sunderbans.mp4' }}
        style={styles.video}
        controls={true}
      /> */}

</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 200,
  },
});
export default ReelsScreenUpdated;
