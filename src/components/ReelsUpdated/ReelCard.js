import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable, ActivityIndicator, FlatList , ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import { Image } from 'react-native-elements';

import User from '../../components/ReelsUpdated/User';
import Buttons from '../../components/ReelsUpdated/Button';
import Header from './Header';
import helper from '../../components/ReelsUpdated/utils/helper';

// Screen Dimensions
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

function ReelCard({
  videoUrls,
  id,
  description,
  ViewableItem,
  liked = false,
  disliked = false,
  index,
  // Container Props
  backgroundColor = 'black',
  // Header Props
  headerTitle = 'Reels',
  headerIconName,
  headerIconColor,
  headerIconSize,
  headerIcon,
  headerComponent,
  onHeaderIconPress = () => {},

  // Options Props
  optionsComponent,
  pauseOnOptionsShow = true,
  onSharePress = () => {},
  onCommentPress = () => {},
  onLikePress = () => {},
  onDislikePress = () => {},

  // Player Props
  onFinishPlaying = () => {},

  // Slider Props
  minimumTrackTintColor = 'white',
  maximumTrackTintColor = 'grey',
  thumbTintColor = 'white',

  // Time Props
  timeElapsedColor = 'white',
  totalTimeColor = 'white',

  // User Props
  username = 'Username',
  profilePic = 'https://picsum.photos/200',
  caption = 'https://picsum.photos/200   this is my caption',
  likes = 2,
  comments = 3,
  shares = 4,
}) {
  
  // ref for Video Player
  const VideoPlayer = useRef(null);

  // States
  const [VideoDimensions, SetVideoDimensions] = useState({
    width: ScreenWidth,
    height: ScreenWidth,
  });
  const [Progress, SetProgress] = useState(0);
  const [Duration, SetDuration] = useState(0);
  const [Paused, SetPaused] = useState(false);
  const [ShowOptions, SetShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  // Play/Pause video according to visibility
  useEffect(() => {
    if (ViewableItem === id) SetPaused(false);
    else SetPaused(true);
    console.log('ViewableItem', ViewableItem);
    console.log('id', id);
    console.log('type',description);
  }, [ViewableItem]);

  // Pause when user toggles options to True
  useEffect(() => {
    if (pauseOnOptionsShow) {
      if (ShowOptions) SetPaused(true);
      else SetPaused(false);
    }
    
  }, [ShowOptions, pauseOnOptionsShow]);

  // Callback for Seek Update
  const SeekUpdate = useCallback(
    async (seekTime) => {
      try {
        if (VideoPlayer.current) VideoPlayer.current.seek((seekTime * Duration) / 100 / 1000);
      } catch (error) {}
    },
    [Duration, ShowOptions]
  );

  // Callback for PlaybackStatusUpdate
  const PlayBackStatusUpdate = (playbackStatus) => {
    try {
      let currentTime = Math.round(playbackStatus.currentTime);
      let duration = Math.round(playbackStatus.seekableDuration);
      if (currentTime && duration) SetProgress((currentTime / duration) * 100);
    } catch (error) {}
  };

  // Function for getting video dimensions on load complete
  const onLoadComplete = (event) => {
    console.log("loading complete");
    const { naturalSize } = event;
    try {
      const naturalWidth = naturalSize.width;
      const naturalHeight = naturalSize.height;
      if (naturalWidth > naturalHeight) {
        SetVideoDimensions({
          width: ScreenWidth,
          height: ScreenWidth * (naturalHeight / naturalWidth),
        });
      } else {
        SetVideoDimensions({
          width: ScreenHeight * (naturalWidth / naturalHeight),
          height: ScreenHeight,
        });
      }
      SetDuration(event.duration * 1000);
      setLoading(false); // Set loading state to false when loading is complete
    } catch (error) {
      setLoading(false); // Set loading state to false in case of an error
    }
  };

  // Function for showing options
  const onMiddlePress = async () => {
    try {
      SetShowOptions(!ShowOptions);
    } catch (error) {}
  };

  // Function to go back 10 seconds
  const onFirstHalfPress = async () => {
    try {
      if (VideoPlayer.current) {
        let toSeek = Math.floor((Progress * Duration) / 100) / 1000;
        if (toSeek > 10) VideoPlayer.current.seek(toSeek - 10);
      }
    } catch (error) {}
  };

  // Function to skip 10 seconds
  const onSecondHalfPress = async () => {
    try {
      if (VideoPlayer.current) {
        let toSeek = Math.floor((Progress * Duration) / 100) / 1000;
        VideoPlayer.current.seek(toSeek + 10);
      }
    } catch (error) {}
  };

  // Manage error here
  const videoError = (error) => {};

  // useMemo for Slider
  const GetSlider = useMemo(
    () => (
      <View style={styles.SliderContainer}>
        <Text style={[styles.TimeOne, { color: timeElapsedColor }]}>
          {helper.GetDurationFormat(Math.floor((Progress * Duration) / 100))}
        </Text>
        <Slider
          style={{ height: 40, width: '100%' }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={minimumTrackTintColor}
          maximumTrackTintColor={maximumTrackTintColor}
          thumbTintColor={thumbTintColor}
          value={Progress}
          onSlidingComplete={(data) => SeekUpdate(data)}
        />
        <Text style={[styles.TimeTwo, { color: totalTimeColor }]}>
          {helper.GetDurationFormat(Duration || 0)}
        </Text>
      </View>
    ),
    [
      Duration,
      Progress,
      ShowOptions,
      thumbTintColor,
      totalTimeColor,
      timeElapsedColor,
      minimumTrackTintColor,
      maximumTrackTintColor,
    ]
  );

  // useMemo for Header
  const GetHeader = useMemo(
    () => (
      <View style={styles.HeaderContainer}>
        <Header
          onPress={onHeaderIconPress}
          text={headerTitle}
          customComponent={headerComponent}
          customIcon={headerIcon}
          color={headerIconColor}
          name={headerIconName}
          size={headerIconSize}
        />
      </View>
    ),
    [
      ShowOptions,
      headerComponent,
      headerIcon,
      headerIconColor,
      headerIconName,
      headerIconSize,
      headerTitle,
      onHeaderIconPress,
    ]
  );

  // useMemo for Options
  const GetButtons = useMemo(
    () => (
      <View style={styles.OptionsContainer}>
        {optionsComponent ? null : (
          <>
            <Buttons
              name={liked ? 'like1' : 'like2'}
              text="like"
              color={liked ? 'dodgerblue' : 'white'}
              onPress={() => onLikePress(id)}
            />
            <Buttons
              name="message1"
              text="comment"
              onPress={() => onCommentPress(id)}
            />
            <Buttons
              name="sharealt"
              text="share"
              onPress={() => onSharePress(id)}
            />
          </>
        )}
      </View>
    ),
    [ShowOptions, optionsComponent, liked, disliked]
  );

  // useMemo for User
  const GetUser = useMemo(
    () => (
      <View style={styles.UserContainer}>
        <User
          username={username}
          profilePic={profilePic}
          caption={caption}
          onPress={() => onUserPress(id)}
        />
      </View>
    ),
    [profilePic, username]
  );

  return (
    <Pressable
      style={[styles.container, { backgroundColor: backgroundColor }]}
      onPress={onMiddlePress}
    >
     {loading ? (
  <ActivityIndicator
    size="large"
    color={activityIndicatorColor}
    style={{ position: 'absolute' }}
  />
) : (
  videoUrls === null ? (
    <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {description}
          </Text>
        </View>
  ) : (
    <View>
    <FlatList
              horizontal
              data={videoUrls}
              renderItem={({ item, index }) => (
                console.log(item.url),
                //  load video if mimetype is video else and tehn display
                item.mimetype === 'video' ? (
                  <Video
                    key={index}
                    ref={VideoPlayer}
                    source={{ uri: item.url }}
                    style={VideoDimensions}
                    resizeMode="contain"
                    onError={videoError}
                    playInBackground={false}
                    progressUpdateInterval={1000}
                    paused={Paused}
                    muted={false}
                    repeat={true}
                    onBuffer={() => {
                      setLoading(true);
                    }}
                    onLoad={(event) => onLoadComplete(event)}
                  />
                ) : (
                  <Image
                    key={index}
                    source={{ uri: item.url }}
                    style={VideoDimensions}
                    resizeMode="contain"
                    onLoad={() => onLoadComplete(event)}
                  />
                )
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
   
  )
)}
      {ShowOptions ? (
        <>
          {GetUser}
          {GetHeader}
          {GetButtons}
          {GetSlider}
        </>
      ) : null}
    </Pressable>
  );
}

// Exports
export default ReelCard;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight,
    justifyContent: 'center',
  },
  SliderContainer: {
    position: 'absolute',
    width: ScreenWidth,
    height: 55,
    bottom: 0,
    zIndex: 100,
  },
  TimeOne: {
    color: 'grey',
    position: 'absolute',
    left: 15,
    fontSize: 13,
    bottom: 5,
  },
  TimeTwo: {
    color: 'grey',
    position: 'absolute',
    right: 15,
    fontSize: 13,
    bottom: 5,
  },
  OptionsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 70,
    zIndex: 100,
  },
  HeaderContainer: {
    position: 'absolute',
    width: ScreenWidth,
    top: 0,
    height: 50,
    zIndex: 100,
  },
  FirstHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: ScreenWidth * 0.25,
    height: ScreenHeight,
    zIndex: 99,
  },
  SecondHalf: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: ScreenWidth * 0.25,
    height: ScreenHeight,
    zIndex: 99,
  },
  UserContainer: {
    position: 'absolute',
    width: ScreenWidth,
    bottom: 90,
    height: 50,
    right: -10,
    zIndex: 100,
  },
  loadingContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
});
