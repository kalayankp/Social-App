import React from 'react';
import {SafeAreaView, Platform, View} from 'react-native';
import {Header} from 'react-native-elements';
import HeaderText from './HeaderText';
import LeftIcons from './LeftIcons';
import RightIcons from './RightIcons';
import {Shadow} from 'react-native-shadow-2';
function MainHeader({title}) {
  return (
    // <SafeAreaView style={{marginTop: Platform.OS === 'android' ? 30 : 0}}>
    <Shadow startColor="#eff0f3" offset={[0, 1]}>
      <Header
        barStyle="light-content"
        containerStyle={{
          backgroundColor: '#fff',
          // marginBottom: 8,
        }}
        leftComponent={<LeftIcons />}
        rightComponent={<RightIcons />}
        centerComponent={<HeaderText title={title} />}
      />
    </Shadow>
    // </SafeAreaView>
  );
}
export default MainHeader;
