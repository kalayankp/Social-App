import React from 'react';
import {View, StyleSheet, Pressable, Platform, TextInput} from 'react-native';
import {Text} from 'react-native-elements';
import MainHeader from '../components/MainHeader';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
//Icons
import FIcons from 'react-native-vector-icons/Feather';
import FFIcons from 'react-native-vector-icons/FontAwesome5';
import IIcons from 'react-native-vector-icons/Ionicons';

import Back from '../components/Back';
import metrics from '../contents/metrics';

const SelectLocationScreen = ({navigation}) => {
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
          color="black"
          style={{
            position: 'absolute',
            top: metrics.width / 47,
            left: metrics.width / 15,
          }}
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
          color="black"
          style={{position: 'absolute', right: metrics.width / 12}}
        />
      </View>
      <View style={{marginTop: 30}}>
        <Pressable style={{flexDirection: 'row'}}>
          <FFIcons
            name="location-arrow"
            size={20}
            style={{marginHorizontal: 20, marginTop: 5}}
          />
          <Text style={{fontSize: 20}}>Current Location</Text>
        </Pressable>
      </View>
      <View style={{flex: 1, marginTop: 20}}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
          style={styles.mapStyle}
          zoomEnabled={true}
          initialRegion={{
            latitude: 22.258,
            longitude: 71.19,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default SelectLocationScreen;
