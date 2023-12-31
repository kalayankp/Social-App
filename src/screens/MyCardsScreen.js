import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Text} from 'react-native-elements';
import metrics from '../contents/metrics';
import Icons from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import MainHeader from '../components/MainHeader';
import RightIcons from '../components/RightIcons';

// function CurrentBalance() {
//   return (
//     <LinearGradient
//       style={{borderRadius: 12}}
//       start={{x: 1, y: 1}}
//       end={{x: 0, y: 0}}
//       colors={['#FF0844', '#FFB199']}>
//       <Pressable>
//         <View
//           style={{
//             flex: 1,
//             marginHorizontal: 20,
//             padding: 5,
//           }}>
//           <Text style={{color: '#fff', fontSize: 30}}>Rs3941.23</Text>
//           <Text style={{color: '#fff', fontSize: 15}}>Current Balance</Text>
//         </View>
//       </Pressable>
//     </LinearGradient>
//   );
// }
// function Publish() {
//   return (
//     <LinearGradient
//       style={{borderRadius: 8}}
//       colors={['#000000', '#00DD4B']}
//       start={{x: 1, y: 1}}
//       end={{x: 0, y: 0}}>
//       <Pressable>
//         <View
//           style={{
//             paddingHorizontal: 20,
//             justifyContent: 'center',
//             flex: 1,
//             paddingVertical: 8,
//           }}>
//           <Text style={{fontSize: 30, color: '#fff'}}>-Rs 25</Text>
//           <Text style={{textAlign: 'center', color: '#fff'}}>Publish</Text>
//         </View>
//       </Pressable>
//     </LinearGradient>
//   );
// }
function SelectLocation() {
  return (
    <View style={styles.textContainer}>
      <Icons style={styles.mapPin} name="map-pin" size={24} />
      <TextInput
        style={styles.textInput}
        placeholder="24, North Kamehameha St."
        placeholderTextColor="#101010"
      />
      <Icons style={styles.map} name="map" size={24} />
    </View>
  );
}

const MyCardsScreen = () => {
  const {height, width} = useWindowDimensions();
  console.log(metrics.width + ' width');
  return (
    <>
      <MainHeader title="PUBLISH" rightComponent={RightIcons} />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{flex: 1, backgroundColor: '#fff', marginTop: 10}}>
          <View style={styles.mainContainer}>
            <View>
              <SelectLocation />
              <TextInput
                placeholder="Select Tags"
                style={styles.selectTags}
                placeholderTextColor="grey"
              />
            </View>
            <View style={styles.imgContainer}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: 40,
                  fontSize: 16,
                  marginBottom: 15,
                  color: '#939393',
                }}>
                Select Cover Content:
              </Text>
              <Image source={require('../asset/images/3.png')} />
            </View>

            <View style={styles.rechargeContainer}>
              <Text style={{color: '#707070', fontSize: 16}}>
                Recharge Gas -
              </Text>
              <TextInput
                style={styles.rechargeInput}
                placeholder="Rs 25"
                placeholderTextColor="#000"
              />
              <Text>~ 12 Views</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'center',
              }}>
              <LinearGradient
                style={{
                  width: width / 2,
                  marginHorizontal: 20,
                  padding: 10,
                  borderRadius: 17,
                }}
                colors={['#FF0844', '#FFB199']}>
                <Pressable>
                  <Text
                    style={{color: '#fff', textAlign: 'center', fontSize: 30}}>
                    Rs 3941.23
                  </Text>
                  <Text style={{color: '#fff', textAlign: 'center'}}>
                    Current Balance
                  </Text>
                </Pressable>
              </LinearGradient>

              <LinearGradient
                style={{
                  padding: 10,
                  borderRadius: 17,
                  width: width / 3,
                }}
                start={{x: 1, y: 1}}
                end={{x: 0, y: 0}}
                colors={['#000000', '#00DD4B']}>
                <Pressable>
                  <Text
                    style={{color: '#fff', textAlign: 'center', fontSize: 30}}>
                    - Rs 25
                  </Text>
                  <Text style={{color: '#fff', textAlign: 'center'}}>
                    Publish
                  </Text>
                </Pressable>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: 100,
    // marginHorizontal: 20,
  },
  textContainer: {
    paddingVertical: metrics.height > 843 ? 15 : 10,

    margin: 15,
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 5,
    borderColor: '#c7c6c6',
  },

  mapPin: {
    position: 'absolute',
    top: metrics.height > 843 ? 13 : 12,
    // top: 9,
    left: 11,
    color: 'black',
  },
  textInput: {
    marginLeft: 50,
    fontSize: 16,
    paddingVertical: 0,
  },

  map: {
    color: 'black',
    position: 'absolute',
    // top: metrics.width / 18,
    top: metrics.height > 843 ? 14 : 10,
    // left: metrics.height > 843 ? 315 : 400,
    left: metrics.width > 799 ? 700 : 315,
  },
  selectTags: {
    borderWidth: 1,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    borderColor: '#c7c6c6',
    fontWeight: 'bold',
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  rechargeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 18,
    marginTop: 25,
    alignItems: 'center',
  },
  rechargeInput: {
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    borderColor: '#c7c6c6',
  },
});

export default MyCardsScreen;
