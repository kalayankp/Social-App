import React from 'react';
import {View, Image, Pressable} from 'react-native';
import {Text} from 'react-native-elements';
import MainHeader from '../components/MainHeader';
import {LinearProgress} from 'react-native-elements';
import Back from '../components/Back';
import metrics from '../contents/metrics';
import FIcons from 'react-native-vector-icons/Feather';

const BuyTokensScreen = () => {
  const MemberShip = ({level, cost}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: metrics.width / 50,
          marginVertical: metrics.width / 25,
        }}>
        <Image source={require('../asset/images/coin1.png')} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-around',
            alignItems: 'center',

            width: metrics.width / 1.9,
            marginLeft: 12,
          }}>
          <Text style={{fontSize: 20}}>{level}</Text>
          <Image
            source={require('../asset/logo.png')}
            style={{
              height: metrics.width / 15,
              width: metrics.width / 12,
              overflow: 'visible',
              resizeMode: 'contain',
            }}
          />
          <Text style={{fontSize: 9}}>Membership Level</Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: metrics.width / 3.2,
          }}>
          <Pressable
            style={{
              backgroundColor: '#9146ff',
              padding: 10,
              borderRadius: 7,
            }}>
            <Text style={{color: '#fff'}}>${cost}</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader title="STORE" rightComponent={Back} />
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginTop: 20,
            marginHorizontal: 10,
          }}>
          <Text
            style={{
              borderWidth: 1,
              paddingHorizontal: 22,
              paddingVertical: 15,
              backgroundColor: '#f7f7fd',
              borderColor: 'blue',
              borderRadius: 5,
              fontSize: 17,
              fontWeight: '400',
            }}>
            3974
          </Text>
          <Image
            style={{
              height: metrics.width / 15,
              width: metrics.width / 12,
              overflow: 'visible',
              marginLeft: 10,
              marginTop: 12,
              resizeMode: 'contain',
            }}
            source={require('../asset/logo.png')}
          />
          <Text style={{marginTop: 16, marginLeft: 9}}>TOKENS =</Text>
          <Text
            style={{
              marginLeft: 15,
              borderWidth: 1,
              fontSize: 20,
              textAlign: 'center',
              paddingHorizontal: 18,
              paddingVertical: 15,
              backgroundColor: '#f7f7fd',
              borderColor: 'blue',
              borderRadius: 5,
            }}>
            Rs 39146.23
          </Text>
        </View>
        <View
          style={{
            // marginTop: metrics.width / 17,
            marginHorizontal: 10,
            marginTop: metrics.width / 25,
            flexDirection: 'row',
            // justifyContent: 'space-between',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
          }}>
          <Pressable
            style={{
              flex: 1,
              alignItems: 'center',
              marginRight: 5,
              // paddingHorizontal: metrics.width / 5, //4
              paddingVertical: metrics.width / 19,
              borderRadius: 5,
              backgroundColor: '#e2e1ff',
              borderColor: '#605eec',
            }}>
            <Text style={{color: '#605eec', fontSize: 18}}>
              Apply For Grant
            </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              paddingVertical: metrics.width / 19,
              alignItems: 'center',
              marginLeft: 5,
              // paddingHorizontal: metrics.width / 11,
              backgroundColor: '#e2e1ff',
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 18, color: '#605eec'}}>Buy Now</Text>
          </Pressable>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              marginHorizontal: 5,
              marginTop: metrics.width / 8,
            }}>
            <Image style={{}} source={require('../asset/images/coin1.png')} />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: metrics.width / 19,
            }}>
            <Text style={{fontSize: 12, color: '#000'}}>Membership levels</Text>
            <Text style={{color: '#8a8994'}}>25,000 XP / 100,100 XP</Text>

            <View style={{alignSelf: 'center', flexDirection: 'row'}}>
              <LinearProgress
                color="blue"
                value={0.2}
                variant="determinate"
                style={{
                  marginTop: 8,
                  width: metrics.width / 1.3,
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: metrics.width / 7,
          }}>
          <FIcons name="award" size={26} color="black" />
          <FIcons name="award" size={26} color="black" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: metrics.width / 17,
            marginLeft: metrics.width / 20,
            // flex: 1,
          }}>
          <Text style={{fontSize: 15, fontWeight: '600'}}>What are</Text>
          <Image
            source={require('../asset/logo.png')}
            style={{
              height: metrics.width / 18,
              width: metrics.width / 14,
              overflow: 'visible',
              marginHorizontal: 8,
              marginVertical: 0.9,
              resizeMode: 'contain',
            }}
          />
          <Text style={{fontSize: 15, fontWeight: '600'}}>Tokens?</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 10, textAlign: 'center'}}>
            Tokens are used in place of money. Using tokens allows 100% platform
            protection on all your
          </Text>
          <Text style={{fontSize: 10, textAlign: 'center'}}>
            purchases through the escrow system, preventing fraud. They are also
            used to pay for views.
          </Text>
        </View>
        <MemberShip level={1} cost={5.99} />
        <MemberShip level={5} cost={16.99} />
        <MemberShip level={10} cost={27.99} />
        <MemberShip level={25} cost={53.99} />
      </View>
    </View>
  );
};
export default BuyTokensScreen;
