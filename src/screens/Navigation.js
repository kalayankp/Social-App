import React from 'react';
import {View, Text} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import FIcon from 'react-native-vector-icons/Feather';
import Explore from './Explore';
import MyCards from './MyCards';
import Insight from './Insight';
import Profile from './Profile';
import Add from './Add';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
export const AddIcon = () => {
  return (
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: '#f5f5f5',
        backgroundColor: '#5851bc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <FIcon name="plus" size={40} color="white" />
    </View>
  );
};

function Navigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',

          borderRadius: 15,
        },
      }}>
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
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
        }}
      />
      <Tab.Screen
        name="MyCards"
        component={MyCards}
        options={{
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
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: ({}) => <AddIcon />,
        }}
      />
      <Tab.Screen
        name="Insight"
        component={Insight}
        options={{
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
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
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
        }}
      />
    </Tab.Navigator>
  );
}

export default Navigation;
