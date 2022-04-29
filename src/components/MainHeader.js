import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Header} from 'react-native-elements';
import HeaderText from './HeaderText';
import LeftIcons from './LeftIcons';
import RightIcons from './RightIcons';
import {Shadow} from 'react-native-shadow-2';

function MainHeader({title, rightComponent = null}) {
  return (
    <>
      <Shadow startColor="#eff0f3" offset={[0, 1]}>
        <Header
          barStyle="dark-content"
          containerStyle={{
            backgroundColor: 'white',
          }}
          leftComponent={<LeftIcons />}
          rightComponent={rightComponent}
          // rightComponent={<RightIcons />}
          centerComponent={<HeaderText title={title} />}
          statusBarProps={{backgroundColor: 'white'}}
        />
      </Shadow>
    </>
  );
}
export default MainHeader;
