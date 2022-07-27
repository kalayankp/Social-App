import React from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-elements';
import FIcon from 'react-native-vector-icons/Feather';
import FFIcon from 'react-native-vector-icons/FontAwesome';
import IIcons from 'react-native-vector-icons/Ionicons';
const AboutNetwork = () => {
  return (
    <>
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            marginHorizontal: 16,
            marginTop: 16,
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            About this Network
          </Text>
          <Pressable>
            <FIcon name="edit-2" size={25} />
          </Pressable>
        </View>
        <View
          style={{
            padding: 16,

            marginHorizontal: 8,
            backgroundColor: '#dfdfdf',
            marginTop: 16,
            shadowColor: 'black',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.5,
            shadowRadius: 5,
          }}>
          <Text style={{fontSize: 20, lineHeight: 28}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 16,
            }}>
            <FFIcon name="lock" style={{alignSelf: 'center'}} size={25} />
            <Text style={{fontSize: 18}}>
              Only members post and see what is posted
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 8,
              marginTop: 16,
            }}>
            <IIcons
              name="eye"
              style={{alignSelf: 'center', marginRight: 24}}
              size={25}
            />
            <Text style={{fontSize: 18}}>Anyone can find this network</Text>
          </View>
        </View>
        <View
          style={{
            padding: 16,

            marginHorizontal: 8,
            backgroundColor: '#dfdfdf',
            marginTop: 16,
            shadowColor: 'black',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.5,
            shadowRadius: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Network Rules by the Network Admin
            </Text>
            <Pressable style={{marginLeft: 8}}>
              <FIcon name="edit-2" size={25} />
            </Pressable>
          </View>
          <View>
            <Text style={{fontSize: 20, marginBottom: 8}}>
              1. Please be kind and polite
            </Text>
            <Text style={{fontSize: 20, marginBottom: 8}}>
              2. Only post related topics in the network
            </Text>
            <Text style={{fontSize: 20}}>
              3. Do not market yourself here for personal purporses
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};
export default AboutNetwork;
