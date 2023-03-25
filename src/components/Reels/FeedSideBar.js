import React, {useContext , useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { Portal } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,Modal
} from 'react-native';
import {Text} from 'react-native-elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {AppContext} from '../Context';
// import {AppImages} from '../Theme/AppImages';
// import {width} from '../Utils/Constant';
import metrics from '../../contents/metrics';




const comments = [
  {
    id: '1',
    user: {
      name: 'Shivam',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    replys:[{
      id: '2',
      user: {
        name: 'Ankita',
        avatar:'https://randomuser.me/api/portraits/women/1.jpg',
    },
    reply:'this is reply  1'
  },
  {
    id: '2',
    user: {
      name: 'Ankita',
      avatar:'https://randomuser.me/api/portraits/women/1.jpg',
  },
  reply:'this is reply  2'
},

]
},
{
  id: '2',
  user: {
    name: 'Ankita',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  replys:[{
    id: '1',
    user: {
      name: 'Shivam',
      avatar:'https://randomuser.me/api/portraits/men/1.jpg',
  },
  reply:'this is reply  3'
},
{
  id: '1',
  user: {
    name: 'Shivam',
    avatar:'https://randomuser.me/api/portraits/men/1.jpg',
},
reply:'this is reply  4'
},

]
},
];
const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  sideBar: {
    width: 80,
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    alignItems: 'center',
  },
  iconOuter: {
    marginVertical: 8,
  },
  center: {
    alignItems: 'center',
  },
  imageOuter: {
    width: metrics.width,
    justifyContent: 'center',
  },
});

const RenderIcon = ({obj, onPress, exStyle = {}}) => {
  // const {appTheme} = useContext(AppContext);
  const {iconOuter, center, icon, text} = styles;
  const {type, imageIcon, size = 30, disText} = obj;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress(type)}
      style={iconOuter}>
      <View styles={center}>
        <Image
          source={imageIcon}
          style={[
            icon,
            {
              height: size,
              width: size,
              tintColor: 'white',
            },
            exStyle,
          ]}
          resizeMode={'contain'}
        />
        {(disText && (
          <Text style={[text, {color: 'white'}]}>{`${disText}`}</Text>
        )) ||
          null}
      </View>
    </TouchableOpacity>
  );
};

const FeedSideBar = ({item, animation , navigation}) => {


  const [messages, setMessages] = useState([]);

  const handleSend = (newMessages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  };
  // const {appTheme} = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const {sideBar} = styles;
  const {like, comment, likeStatus} = item;
  
  const makeAction = async type => {
    // Here perfom feed action based on Type
  };


  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Animated.View
      style={[
        sideBar,
        {
          bottom: insets.bottom + 10,
        },
        animation,
      ]}>
        
   
        {/* <LikeButton/> */}
        {/* <Comment/> */}
        
      
        {/* <ShareButton content={`https://liteblog.azurewebsites.net/`}/> */}
      <RenderIcon
        obj={{
          imageIcon: require('../../asset/Assets/Icons/heart.png'),
          disText: like,
          size: 35,
          type: 'Like',
        }}
        exStyle={{tintColor: likeStatus}}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{
          imageIcon: require('../../asset/Assets/Icons/comment.png'),
          disText: comment,
          type: 'Comment',
        }}
        onPress={() => navigation.navigate('Comment') }
      />
      
      
      <RenderIcon
        obj={{
          imageIcon: require('../../asset/Assets/Icons/share.png'),
          size: 35,
          type: 'More',
        }}
        onPress={makeAction}
      />
    </Animated.View>
  );
};




export {FeedSideBar};
