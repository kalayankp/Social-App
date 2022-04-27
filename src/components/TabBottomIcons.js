import React from 'react';
import {View, Text} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';

const ExploreNavigationOption = {
  headerTitle: '',
  tabBarIcon: ({color, size}) => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
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

        //   top: 10,
      }}>
      <Icons name="clone" color={color} size={20} />
      <Text
        style={{
          // top: 8,
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
        //   top: 10,
      }}>
      <Icons name="poll" color={color} size={20} />
      <Text
        style={{
          // top: 8,
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
        //   top: 10,
      }}>
      <Icons name="user" size={20} color={color} />
      <Text
        style={{
          // top: 8,
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
  tabBarStyle: {
    position: 'absolute',

    borderRadius: 15,
  },
};

export {
  ExploreNavigationOption,
  MyCardsNavigationOption,
  InsightNavigationOption,
  ProfileNavigationOptions,
  BottomNavigationScreenOption,
};
