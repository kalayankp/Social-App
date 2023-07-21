import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList  ,  RefreshControl} from 'react-native';

import ReelCard from './ReelCard';
import { View } from 'react-native';
const ScreenHeight = Dimensions.get('window').height;

function Reels({
  videos,
  backgroundColor = 'white',
  fetchVideos,
  headerTitle,
  headerIconName,
  headerIconColor,
  headerIconSize,
  headerIcon,
  headerComponent,
  onHeaderIconPress,
  optionsComponent,
  pauseOnOptionsShow,
  onSharePress,
  onCommentPress,
  onLikePress,
  onDislikePress,
  onFinishPlaying,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  timeElapsedColor,
  totalTimeColor,
  username,
  profilePic,
  caption,
  likes,
  comments,
  shares
}) {
  const FlatlistRef = useRef(null);
  const [ViewableItem, SetViewableItem] = useState('');
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });
  const applyProps = {
    backgroundColor: backgroundColor,
    headerTitle: headerTitle,
    headerIconName: headerIconName,
    headerIconColor: headerIconColor,
    headerIconSize: headerIconSize,
    headerIcon: headerIcon,
    headerComponent: headerComponent,
    onHeaderIconPress: onHeaderIconPress,
    optionsComponent: optionsComponent,
    pauseOnOptionsShow: pauseOnOptionsShow,
    onSharePress: onSharePress,
    onCommentPress: onCommentPress,
    onLikePress: onLikePress,
    onDislikePress: onDislikePress,
    onFinishPlaying: onFinishPlaying,
    minimumTrackTintColor: minimumTrackTintColor,
    maximumTrackTintColor: maximumTrackTintColor,
    thumbTintColor: thumbTintColor,
    timeElapsedColor: timeElapsedColor,
    totalTimeColor: totalTimeColor,
    username: username,
    profilePic: profilePic,
    caption: caption,
    likes: likes,
    comments: comments,
    shares: shares
  };



  const onViewRef = useRef(viewableItems => {
    if (viewableItems?.viewableItems?.length > 0)
      SetViewableItem(viewableItems.viewableItems[0].item.id || 0);
  });

  const onEndReached = () => {
    console.log('end reached');  
  };

  useEffect(() => {
    console.log(videos)
  }, [videos])


  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Trigger the fetchVideos function provided as prop
      await fetchVideos();
    } catch (error) {
      console.error('Error while refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <FlatList
      ref={FlatlistRef}
      data={videos}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <ReelCard
          {...item}
          index={index}
          ViewableItem={ViewableItem}
          onFinishPlaying={index => {
            if (index !== videos.length - 1) {
              FlatlistRef.current.scrollToIndex({
                index: index + 1,
              });
            }
          }}
          {...applyProps}
        />
       
      )}
      getItemLayout={(_data, index) => ({
        length: ScreenHeight,
        offset: ScreenHeight * index,
        index,
      })}
      pagingEnabled
      decelerationRate={0.9}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}

export default Reels;


      