import React from 'react';
import {View, Image, Pressable} from 'react-native';
import {Text} from 'react-native-elements';
import {comment, like, member, share} from '../asset/images';
import metrics from '../contents/metrics';
const Announcement = ({
  profileImage = null,
  description = '',
  contentImg = null,
  name = '',
}) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          marginHorizontal: 16,
          marginTop: 8,
          borderRadius: 8,
          overflow: 'hidden',
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          shadowRadius: 4,

          backgroundColor: '#ddd',
        }}>
        <View
          style={{
            marginTop: 16,
            marginHorizontal: 8,
            flexDirection: 'row',
          }}>
          <Image
            source={member}
            style={{
              width: metrics.width / 6,
              height: metrics.width / 6,
              borderRadius: metrics.width / 12,
              marginLeft: 16,
              marginTop: 16,
              marginBottom: 16,
            }}
          />
          <View style={{justifyContent: 'center', marginLeft: 16}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
              Arvind Kumar
            </Text>
            <Text style={{fontSize: 14}}>22-11-2021 9:00 AM</Text>
          </View>
        </View>
        <View style={{marginBottom: 16}}>
          {contentImg ? (
            <Image
              source={contentImg}
              resizeMode="stretch"
              style={{
                width: metrics.width / 1.2,
                height: metrics.width / 2,
                marginHorizontal: 16,
              }}
            />
          ) : null}
          {description ? (
            <Text
              style={{
                marginHorizontal: 16,
                marginTop: 16,
                fontSize: 18,
                textAlign: 'left',
                lineHeight: 25,
              }}>
              {description}
            </Text>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
            marginBottom: 20,
          }}>
          <Pressable>
            <Image source={like} style={{height: 20, width: 20}} />
          </Pressable>
          <Pressable>
            <Image source={comment} style={{height: 20, width: 20}} />
          </Pressable>
          <Pressable>
            <Image source={share} style={{height: 20, width: 20}} />
          </Pressable>
        </View>
      </View>
    </>
  );
};
export default Announcement;
