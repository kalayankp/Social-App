import React from 'react';
import {View ,StatusBar} from 'react-native';
import Reels from  '../components/ReelsUpdated/Reels'
import { useNavigation } from '@react-navigation/native';
function ReelsScreenUpdated() {
      const videos = [
        { _id: '1', uri: require('../asset/Assets/video4.mov')},
        { _id: '2', uri: require('../asset/Assets/video4.mov') },
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
      onDislikePress={onDislikePress}
      onFinishPlaying={onFinishPlaying}
      userInfo={userInfo}
    />
    </View>
  );
}
export default ReelsScreenUpdated;
