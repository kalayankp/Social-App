import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import MainHeader from '../components/MainHeader';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
//Icons
import FIcons from 'react-native-vector-icons/Feather';
import FFIcons from 'react-native-vector-icons/FontAwesome5';
import IIcons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';

const SelectLocationScreen = ({navigation}) => {
  const Back = () => {
    function back() {
      navigation.navigate('BottomTabNavigation');
    }
    return (
      <View>
        <Pressable onPress={back}>
          <Text style={{fontSize: 18}}>Send</Text>
          {/* <IIcons name="return-up-back" size={28} style={{marginRight: 12}} /> */}
        </Pressable>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainHeader title="Pick a Location" rightComponent={Back} />
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FIcons
          name="search"
          size={20}
          style={{position: 'absolute', top: 10, left: 25}}
        />
        <TextInput
          style={{
            width: '90%',
            fontSize: 15,
            paddingHorizontal: 40,
            paddingVertical: 10,
            borderRadius: 10,
            borderWidth: 1,
          }}
          placeholder="India"
          placeholderTextColor="#101010"
        />
        <IIcons
          name="close-circle"
          size={20}
          style={{position: 'absolute', right: 25}}
        />
      </View>
      <View style={{flex: 1, marginTop: 30}}>
        <Pressable style={{flexDirection: 'row'}}>
          <FFIcons
            name="location-arrow"
            size={20}
            style={{marginHorizontal: 20, marginTop: 5}}
          />
          <Text style={{fontSize: 20}}>Current Location</Text>
        </Pressable>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
            marginBottom: 20,
            width: 300,
            height: 400,
          }}
          initialRegion={{
            latitude: 35.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default SelectLocationScreen;
