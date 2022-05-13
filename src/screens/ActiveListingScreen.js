import React from 'react';
import {View, TextInput, Text, ScrollView, Image} from 'react-native';
import MainHeader from '../components/MainHeader';
import Back from '../components/Back';
import Icons from 'react-native-vector-icons/EvilIcons';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import metrics from '../contents/metrics';

const ActiveListingScreen = () => {
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
        backgroundColor: 'white',
        flex: 1,
        marginBottom: metrics.height / 2.5,
      }}>
      <MainHeader title="My Cards" rightComponent={Back} />
      <View>
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
        <View>
          <ScrollView>
            <View
              style={{flexDirection: 'row', marginLeft: metrics.width / 30}}>
              <Image
                source={require('../asset/images/img1.png')}
                style={{
                  width: 100,
                  margin: metrics.width / 30,
                  borderRadius: metrics.width / 25,
                }}
              />
              <Image
                source={require('../asset/images/img2.png')}
                style={{
                  width: 100,
                  margin: metrics.width / 30,
                  borderRadius: metrics.width / 25,
                }}
              />
              <Image
                source={require('../asset/images/img4.png')}
                style={{
                  width: 100,
                  margin: metrics.width / 30,
                  borderRadius: metrics.width / 25,
                }}
              />
            </View>
            <View
              style={{flexDirection: 'row', marginLeft: metrics.width / 30}}>
              <Image
                source={require('../asset/images/img1.png')}
                style={{
                  width: 100,
                  margin: metrics.width / 30,
                  borderRadius: metrics.width / 25,
                }}
              />
              <Image
                source={require('../asset/images/img2.png')}
                style={{
                  width: 100,
                  margin: metrics.width / 30,
                  borderRadius: metrics.width / 25,
                }}
              />
              <Image
                source={require('../asset/images/img4.png')}
                style={{
                  width: 100,
                  margin: metrics.width / 30,
                  borderRadius: metrics.width / 25,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: metrics.width / 30,
              }}>
              <Image
                source={require('../asset/images/img1.png')}
                style={{
                  width: 100,
                  margin: metrics.width / 30,
                  borderRadius: metrics.width / 25,
                }}
              />
              <Image
                source={require('../asset/images/img2.png')}
                style={{
                  width: 100,
                  margin: metrics.width / 30,
                  borderRadius: metrics.width / 25,
                }}
              />
              <Image
                source={require('../asset/images/img4.png')}
                style={{
                  width: 100,
                  margin: metrics.width / 30,
                  borderRadius: metrics.width / 25,
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default ActiveListingScreen;
