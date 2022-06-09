import React from 'react';
import {View, TextInput} from 'react-native';
import Icons from 'react-native-vector-icons/EvilIcons';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import metrics from '../../contents/metrics';
import ImageList from '../ImageList';
import {img1, img2, img3} from '../../asset/images';
const AddCards = () => {
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
  return (
    <>
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
            borderColor: '#c7c6c6',
            padding: 12,
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
      <ImageList images={images} />
    </>
  );
};
export default AddCards;
