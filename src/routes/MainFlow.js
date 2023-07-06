import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import ExploreScreen from '../screens/ExploreScreen';
import MyCardsScreen from '../screens/MyCardsScreen';
import InsightScreen from '../screens/InsightScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddScreen from '../screens/AddScreen';
import CreateTradeScreen from '../screens/CreateTradeScreen';
import SelectLocationScreen from '../screens/SelectLocationScreen';
import TradeStatusScreen from '../screens/TradeStatusScreen';
import ChatScreen from '../screens/ChatScreen';
import AllChatScreen from '../screens/AllChatScreen';
import {FeedRow} from '../components/Reels/FeedRow';
import Reels from '../components/ReelsUpdated/Reels';
import ReelsScreenUpdated from '../screens/ReelScreenUpdated';
import ReelsScreen from '../screens/ReelsScreen';
import ActiveListingScreen from '../screens/ActiveListingScreen';
import AddCards from '../components/CreateTrade/AddCards';
import DraftingScreen from '../screens/DraftingScreen';
import SigningScreen from '../screens/SigningScreen';
//Extras
import {AddIcon} from '../screens/AddIcon';

// Navigation Options
import {
  ExploreNavigationOption,
  ProfileNavigationOptions,
  MyCardsNavigationOption,
  InsightNavigationOption,
  BottomNavigationScreenOption,
} from '../components/TabBottomIcons';
import BuyTokensScreen from '../screens/BuyTokensScreen';
import NetworkHomeScreen from '../screens/NetworkHomeScreen';
import CommentScreen from '../components/Reels/CommentScreen';
import CommentHistory from '../components/ReelsUpdated/CommentHistory';
import CreatePost from '../screens/CreatePost';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator screenOptions={BottomNavigationScreenOption}>
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={ExploreNavigationOption}
      />
      <Tab.Screen
        name="MyCards"
        component={MyCardsScreen}
        options={MyCardsNavigationOption}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({}) => <AddIcon />,
        }}
      />
      <Tab.Screen
        name="Insight"
        component={InsightScreen}
        options={InsightNavigationOption}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={ProfileNavigationOptions}
      />
    </Tab.Navigator>
  );
}

const MainStackFlow = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group>
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Group>
        <Drawer.Screen
          name="MainStackFlow"
          component={MainStackFlow}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateTrade"
          component={CreateTradeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectLocation"
          component={SelectLocationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TradeStatus"
          component={TradeStatusScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllChatScreen"
          component={AllChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BuyTokens"
          component={BuyTokensScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Reels"
          component={ReelsScreenUpdated}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ActiveListing"
          component={ActiveListingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="NetworkHome"
          component={NetworkHomeScreen}
        />
        {/* drafting */}
        <Stack.Screen
          name="Drafting"
          component={DraftingScreen}
          // options={{headerShown: false}}
        />
        {/* signing */}
        <Stack.Screen
          name="Signing"
          component={SigningScreen}
          // options={{headerShown: false}}
        />
         <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          // options={{headerShown: false}}
        />
      </Drawer.Group>

      {/* <Drawer.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="AddCards"
          component={AddCards}
          options={{headerLeft: null}}
        />
      </Drawer.Group> */}

      {/* <Stack.Screen name="Reels" component={FeedRow} /> */}
    </Drawer.Navigator>
  );
};

const MainFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name="DrawerNavigation"
          component={DrawerNavigation}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="AddCards"
          component={AddCards}
          options={{headerLeft: null}}
        />
      </Stack.Group>
      <Stack.Screen name="Comment" component={CommentScreen} />
      <Stack.Screen name="CommentHistory" component={CommentHistory} />
    </Stack.Navigator>
  );
};

export default MainFlow;
