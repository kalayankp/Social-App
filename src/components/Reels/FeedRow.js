import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {FeedFooter} from './FeedFooter';
import {FeedSideBar} from './FeedSideBar';
import {VideoComponent} from './VideoComponent';
import Icons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import metrics from '../../contents/metrics';
import ReelSearchBar from '../Search/ReelSearchBar';

const FeedRow = ({item, isNext, isVisible, index, transitionAnimation}) => {
  const navigation = useNavigation();
  const Back = () => {
    const back = () => {
      navigation.navigate('BottomTabNavigation');
    };
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 1000,
          elevation: 1000,
          marginTop: metrics.width / 8,
          marginLeft: metrics.width / 20,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: 'white',
          padding: 5,
        }}>
        <Icons name="return-up-back" size={30} color="white" onPress={back} />
      </View>
    );
  };
  const [isMute, setIsMute] = useState(true);
  const setMute = () => {
    setIsMute(!isMute);
  };
  const {post} = item;
  console.log(item.isImage);
  return (
    <View>
      <VideoComponent
        post={post}
        isNext={isNext}
        isVisible={isVisible}
        setIsMute={setMute}
        isMute={isMute}
      />
      {/* <ReelSearchBar/> */}
      <Back />
      <FeedSideBar item={item} animation={transitionAnimation(index)} />
      <FeedFooter item={item} animation={transitionAnimation(index)} />
    </View>
  );
};

export {FeedRow};
