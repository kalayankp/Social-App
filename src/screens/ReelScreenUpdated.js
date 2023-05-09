import React from 'react';
import {View} from 'react-native';
import Reels from  '../components/ReelsUpdated/Reels'

export default function ReelsScreenUpdated() {
    const videos = [
        { _id: '1', uri: require('../asset/Assets/video3.mov') },
        { _id: '2', uri: require('../asset/Assets/video3.mov') },
        { _id: '3', uri:  require('../asset/Assets/video4.mov') },
        // ...
      ];
      
    return(
        <View style={{flex: 1}}>
        <Reels videos={videos} headerTitle='shivam' />
      </View>
    );
    }
