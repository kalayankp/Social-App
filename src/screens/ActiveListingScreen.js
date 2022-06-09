import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import MainHeader from '../components/MainHeader';
import Back from '../components/Back';
import Icons from 'react-native-vector-icons/EvilIcons';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import metrics from '../contents/metrics';
import {img1, img2, img3} from '../asset/images';
import ImageList from '../components/ImageList';
const ActiveListingScreen = () => {
  const images = [
    {id: 1, image: img1},
    {id: 2, image: img2},
    {id: 3, image: img3},
    {id: 4, image: img1},
    {id: 5, image: img2},
    {id: 6, image: img3},
    {id: 7, image: img1},
    {id: 8, image: img2},
    {id: 9, image: img3},
  ];
  const Details = ({listingNumber}) => {
    return (
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
          //   marginTop: metrics.width / 16,
        }}>
        <Text>ASSET</Text>
        {listingNumber > 0 ? (
          <Text
            style={{
              position: 'absolute',
              left: metrics.width / 1.75,
              top: metrics.width / 90,
              backgroundColor: '#de3430',
              borderRadius: 11,
              padding: 3,
              overflow: 'hidden',
              fontSize: 12,
              color: 'white',
            }}>
            {listingNumber}
          </Text>
        ) : null}

        <Text>LISTING</Text>

        <Text>DRAFTS</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        // borderWidth: 3,
        backgroundColor: 'white',
        // marginBottom: metrics.height / 2.5,
      }}>
      <MainHeader title="My Cards" rightComponent={Back} />
      <View style={{}}>
        <Details listingNumber={10} />
        <View>
          <Icons
            name="search"
            size={29}
            style={{
              position: 'absolute',
              left: metrics.width / 11,
              top: metrics.height / 40,
            }}
          />
          <TextInput
            placeholder="Search"
            style={{
              borderWidth: 1,
              padding: 10,
              width: metrics.width / 1.3,
              marginHorizontal: metrics.width / 15,
              marginTop: metrics.width / 25,
              borderRadius: 10,
              paddingLeft: 50,
            }}
          />
          <MIcons
            name="filter-outline"
            size={27}
            style={{
              position: 'absolute',
              top: metrics.width / 27,
              left: metrics.width / 1.16,
              backgroundColor: '#efefef',
              padding: 5,
            }}
          />
        </View>
      </View>
      <View style={{flex: 1, marginLeft: 10}}>
        <ImageList images={images} />
      </View>
    </View>
  );
};
export default ActiveListingScreen;
