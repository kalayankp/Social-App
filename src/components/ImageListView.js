import React from 'react';
import {ScrollView, View, Image} from 'react-native';
import metrics from '../contents/metrics';
const ImageListView = ({data}) => {
  console.log(data);
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 16,
        }}>
        <ScrollView>
          {data.map((item, index) => {
            return (
              <Image
                key={index}
                source={item.image}
                style={{
                  width: metrics.width / 1.2,
                  height: metrics.height,
                  borderRadius: 8,
                  marginBottom: 8,
                  marginHorizontal: 8,
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};
export default ImageListView;
