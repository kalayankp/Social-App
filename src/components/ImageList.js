import React, {useState} from 'react';
import {ScrollView, Pressable, Image, View} from 'react-native';
import metrics from '../contents/metrics';
import {Shadow} from 'react-native-shadow-2';
const ImageList = images => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  //   const selectImage = id => {
  //     if (selectedImage.includes(id)) {
  //       setSelectedImage(prev => {
  //         console.log(prev.filter(imgid => imgid !== id));
  //       });
  //     } else {
  //       setSelectedImage(prev => [...prev, id]);
  //     }
  //   };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: metrics.height / 9,
          marginTop: 20,
        }}>
        {images.images.map((img, index) => {
          return (
            // <Shadow
            //   containerViewStyle={{
            //     overflow: 'visible',
            //     marginTop: 10,
            //   }}>
            <Pressable
              key={index}
              onPress={() => {
                // selectImage(img.id);
              }}
              style={{
                borderWidth: 0,
                borderColor: '#39b54a',
              }}>
              <Image
                style={{
                  height: metrics.width / 2,
                  marginHorizontal: 8,
                  width: (metrics.width - 48) / 3,
                  marginTop: 8,
                  borderRadius: 8,
                }}
                key={index}
                source={img.image}
              />
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};
export default ImageList;
