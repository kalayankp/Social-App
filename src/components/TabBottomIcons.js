import React from 'react';
import {View,Image} from 'react-native';
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
      <Image
        source={require('../asset/images/Home.png')}
        style={{ tintColor: '#000' }}
      />
      <Text
        style={{
          // top: 8,
          fontSize: 12,
          color: '#000',
          fontWeight: '500',
          top:2
        }}>
        Home
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
      <Image
        source={require('../asset/images/Cards.png')}
        style={{tintColor: '#000' }}
      />
      <Text
        style={{
          fontSize: 12,
          color: '#000',
          fontWeight: '500',
          bottom:2,
          tintColor: color 
        }}>
         Cards
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
 <Image
        source={require('../asset/images/Shape.png')}
        style={{tintColor: '#000' ,}}
      />
      <Text
        style={{
          // flex: 1,
          color: '#000',
          fontSize: 12,
          fontWeight: '500',
          tintColor: color,
          top:6 
        }}>
        Insight
      </Text>
    </View>
  ),
};

const CommunityScreenNavigation = {
  tabBarIcon: ({size, color}) => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: metrics.width >= 800 ? 150 : null,
        // flex: 1,
      }}>
    <Image
        source={require('../asset/images/People.png')}
        style={{tintColor: '#000' }}
      />
      <Text
        style={{
          color: '#000',
          fontSize: 12,

          fontWeight: '500',
        }}>
        Community
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
    <Image
        source={require('../asset/images/Profile.png')}
        style={{tintColor: '#000' }}
      />
      <Text
        style={{
          color: '#000',
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
bottom:-10,
    borderRadius: 15,
    width: 414,
    height: 86,
    backgroundColor:'#FFFFFF',
    borderRadius:20,
    
  },
};

export {
  ExploreNavigationOption,
  MyCardsNavigationOption,
  InsightNavigationOption,
  CommunityScreenNavigation,
  ProfileNavigationOptions,
  BottomNavigationScreenOption,
};