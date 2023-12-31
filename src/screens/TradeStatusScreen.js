import React from 'react';
import {View, Pressable, Image} from 'react-native';
import {Text} from 'react-native-elements';
import MainHeader from '../components/MainHeader';
import IIcons from 'react-native-vector-icons/Ionicons';
import metrics from '../contents/metrics';
const TradeStatusScreen = ({navigation}) => {
  const Back = () => {
    function back() {
      navigation.navigate('BottomTabNavigation');
    }
    return (
      <View>
        <Pressable onPress={back}>
          {/* <Text style={{fontSize: 18}}>Send</Text> */}
          <IIcons name="return-up-back" size={28} style={{marginRight: 12}} />
        </Pressable>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <MainHeader title="TRADE" rightComponent={Back} />
      <View style={{}}>
        <View
          style={{
            alignSelf: 'flex-end',
            backgroundColor: '#5851bc',
            borderRadius: metrics.height / 30,
            height: metrics.height / 18,
            width: metrics.height / 18,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginRight: 25,
          }}>
          <Text style={{color: '#ffffff'}}>i</Text>
        </View>
        <Text
          style={{
            textAlign: 'right',
          }}>
          INFO
        </Text>

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 27, color: '#1f1f1f', marginBottom: 5}}>
            You Traded
          </Text>
          <Image
            source={require('../asset/images/Tradeimg1.png')}
            // style={{height: metrics.height / 3.5}}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 27, color: '#1f1f1f', marginVertical: 10}}>
            Srikanth Traded
          </Text>
          <Image
            source={require('../asset/images/TradeImg2.png')}
            // style={{
            //   height: metrics.height / 3.5,
            //   borderRadius: 7,
            // }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',

          marginTop: 18,
          marginHorizontal: 10,
        }}>
        <Pressable style={{flex: 1}}>
          <Text
            style={{
              color: '#5d5d5d',
              backgroundColor: '#dedee5',
              textAlign: 'center',
              padding: 20,

              borderRadius: 10,
              overflow: 'hidden',
              marginRight: 5,
            }}>
            REPORT TRADE
          </Text>
        </Pressable>
        <Pressable style={{flex: 1}}>
          <Text
            style={{
              color: '#fff',
              backgroundColor: '#5851bc',
              textAlign: 'center',
              padding: 20,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            CLOSE TRADE
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
export default TradeStatusScreen;
