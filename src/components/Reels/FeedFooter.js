import React, {useState} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {Text} from 'react-native-elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import metrics from '../../contents/metrics';
// import {AppContext} from '../Context';
// import {AppImages} from '../Theme/AppImages';
// import CommonStyle from '../Theme/CommonStyle';
// import {width} from '../Utils/Constant';
import {FollowButton} from './AppButton';

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    position: 'absolute',
    zIndex: 1000,
    bottom: 0,
    left: 0,
    width: metrics.width - 60,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  userName: {
    fontSize: 16,
    marginHorizontal: 8,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetail: {
    marginBottom: 5,
  },
  postDetail: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  avatar: {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginRight: 5,
  },
});

const FeedFooter = ({item, animation}) => {
  // const {appTheme} = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const {row, avatar, userDetail, userName, postDetail} = styles;
  const {
    user: {name, isFollowing},
    postText,
  } = item;

  const onUserProfile = () => {
    // Navigate to user Profile
  };

  const onFollow = () => {
    // Here Perform Follow Unfollow
  };

  return (
    <Animated.View
      style={[
        styles.footer,
        {
          marginBottom: insets.bottom + 20,
        },
        animation,
      ]}>
      <View style={[row, userDetail]}>
        <TouchableOpacity activeOpacity={0.6} onPress={onUserProfile}>
          <View style={row}>
            <Image
              source={require('../../asset/Assets/user.jpeg')}
              style={[
                avatar,
                {
                  backgroundColor: '#d1d1d6',
                },
              ]}
            />
            <Text numberOfLines={1} style={[userName, {color: '#ffffff'}]}>
              {name}
            </Text>
          </View>
        </TouchableOpacity>
        <FollowButton
          text={(isFollowing && 'Following') || 'Follow'}
          onPress={onFollow}
        />
      </View>
      <View style={postDetail}>
        <Text
          style={{flex: 1, backgroundColor: 'transparent', color: '#ffffff'}}
          numberOfLines={2}>
          {postText}
        </Text>
      </View>
    </Animated.View>
  );
};

export {FeedFooter};
