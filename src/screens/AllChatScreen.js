import React from 'react';
import {View, Pressable, Image} from 'react-native';
import {Text} from 'react-native-elements';
import MainHeader from '../components/MainHeader';
import Back from '../components/Back';
import IIcon from 'react-native-vector-icons/FontAwesome';
import metrics from '../contents/metrics';
import {ScrollView} from 'react-native-gesture-handler';
const AllChatScreen = () => {
  const Chat = ({isOnline}) => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        {isOnline ? (
          <View
            style={{
              backgroundColor: '#2daa60',
              width: 15,
              height: 15,
              position: 'absolute',
              top: metrics.height / 13.5,
              left: metrics.height / 15.5,

              borderRadius: 30,

              overflow: 'hidden',
              zIndex: 100,
            }}></View>
        ) : (
          <></>
        )}

        <Image
          source={require('../asset/images/Clipped.png')}
          style={{
            width: metrics.width / 10,
            height: metrics.height / 12,
            overflow: 'hidden',
            marginLeft: 20,
            marginTop: 10,
          }}
        />
        <View
          style={{
            justifyContent: 'center',

            marginLeft: 25,

            overflow: 'hidden',
            paddingRight: 35,
          }}>
          <Text style={{marginBottom: 5, fontWeight: 'bold', fontSize: 15}}>
            Prashant Mohan
          </Text>
          <Text style={{fontSize: 17}}>You:Look up Kyle cool</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',

            marginRight: 20,
            alignItems: 'flex-end',
          }}>
          <Pressable>
            <IIcon name="angle-right" size={25} style={{}} />
          </Pressable>
          <Text>11:45 AM</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader title="All Chats" rightComponent={Back} />
      <ScrollView>
        <Chat isOnline={true} />
        <Chat isOnline={false} />
        <Chat isOnline={true} />
        <Chat isOnline={false} />
        <Chat isOnline={false} />
        <Chat isOnline={true} />
        <Chat isOnline={true} />
        <Chat isOnline={false} />
        <Chat isOnline={true} />
      </ScrollView>
    </View>
  );
};
export default AllChatScreen;
