import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import metrics from '../contents/metrics';

const ExploreNavigationOption = {
  headerTitle: '',
  tabBarIcon: ({color, size}) => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: metrics.width >= 800 ? 150 : null,
      }}>
      <Icons name="home" light color={color} size={20} />
      <Text
        style={{
          // top: 8,
          fontSize: 12,
          color: '#939393',
          fontWeight: '500',
        }}>
        Explore
      </Text>
    </View>
  ),
};

const MyCardsNavigationOption = {
  title: 'My Cards',
  tabBarIcon: ({color, size}) => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: metrics.width >= 800 ? 150 : null,
      }}>
      <Icons name="clone" color={color} size={20} />
      <Text
        style={{
          fontSize: 12,
          color: '#939393',
          fontWeight: '500',
        }}>
        My Cards
      </Text>
    </View>
  ),
};

const InsightNavigationOption = {
  tabBarIcon: ({color, size}) => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: metrics.width >= 800 ? 150 : null,
        // flex: 1,
      }}>
      <Icons name="poll" color={color} size={20} />
      <Text
        style={{
          // flex: 1,
          color: '#939393',
          fontSize: 12,
          fontWeight: '500',
        }}>
        Insight
      </Text>
    </View>
  ),
};
const ProfileNavigationOptions = {
  tabBarIcon: ({size, color}) => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: metrics.width >= 800 ? 150 : null,
        // flex: 1,
      }}>
      <Icons name="user" size={20} color={color} />
      <Text
        style={{
          color: '#939393',
          fontSize: 12,

          fontWeight: '500',
        }}>
        Profile
      </Text>
    </View>
  ),
};

const BottomNavigationScreenOption = {
  headerShown: false,
  tabBarShowLabel: false,
  // tabBarStyle: {
  //   position: 'absolute',
  //   bottom: 10,
  //   borderRadius: 15,
  // },
};

export {
  ExploreNavigationOption,
  MyCardsNavigationOption,
  InsightNavigationOption,
  ProfileNavigationOptions,
  BottomNavigationScreenOption,
};
