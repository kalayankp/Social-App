import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {FeedFooter} from './FeedFooter';
import {FeedSideBar} from './FeedSideBar';
import {VideoComponent} from './VideoComponent';

const FeedRow = ({item, isNext, isVisible, index, transitionAnimation}) => {
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

      <FeedSideBar item={item} animation={transitionAnimation(index)} />
      <FeedFooter item={item} animation={transitionAnimation(index)} />
    </View>
  );
};

export {FeedRow};
