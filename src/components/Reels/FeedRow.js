import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {FeedFooter} from './FeedFooter';
import {FeedSideBar} from './FeedSideBar';
import {VideoComponent} from './VideoComponent';
import Icons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import metrics from '../../contents/metrics';

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
          marginTop: metrics.width / 8,
          marginLeft: metrics.width / 20,
        }}>
        <Icons name="return-up-back" size={40} color="black" onPress={back} />
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
      <Back />
      <VideoComponent
        post={post}
        isNext={isNext}
        isVisible={isVisible}
        setIsMute={setMute}
        isMute={isMute}
      />

      <FeedSideBar item={item} animation={transitionAnimation(index)} />
      <FeedFooter item={item} animation={transitionAnimation(index)} />
    </View>
  );
};

export {FeedRow};
