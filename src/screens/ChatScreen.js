import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import MainHeader from '../components/MainHeader';
import IIcons from 'react-native-vector-icons/Ionicons';
import metrics from '../contents/metrics';
import Back from '../components/Back';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, [setMessages]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  // const RecivedMessage = ({message}) => {
  //   return (
  //     <View style={{marginHorizontal: 20, marginVertical: 5}}>
  //       <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
  //         <Text
  //           style={{
  //             backgroundColor: '#f6f6f6',
  //             color: '#262626',
  //             // width: 250,
  //             padding: 10,
  //             borderRadius: 10,
  //             overflow: 'hidden',
  //             fontSize: 18,
  //             paddingVertical: 15,
  //           }}>
  //           {/* helloI have plans of calling all my friends for lunch on */}
  //           {/* sunday */}
  //           {message}
  //         </Text>
  //         <Text>1.48 AM</Text>
  //       </View>
  //     </View>
  //   );
  // };
  // const SentMessage = ({message}) => {
  //   return (
  //     <View style={{marginHorizontal: 20, marginVertical: 0}}>
  //       <View style={{justifyContent: 'flex-start', alignItems: 'flex-end'}}>
  //         <Text
  //           style={{
  //             backgroundColor: '#f6f6f6',
  //             color: '#262626',
  //             // width: 250,
  //             padding: 10,
  //             borderRadius: 10,
  //             overflow: 'hidden',
  //             fontSize: 18,
  //             paddingVertical: 15,
  //           }}>
  //           {/* helloI have plans of calling all my friends for lunch on */}
  //           {/* sunday */}
  //           {message}
  //         </Text>
  //         <Text>1.48 AM</Text>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader title="CHATS" rightComponent={Back} />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};
export default ChatScreen;
