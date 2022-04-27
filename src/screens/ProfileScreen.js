import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';

import {cardImage1, cardImage2, cardImage3} from '../asset/images/index';

import MainHeader from '../components/MainHeader';

const Cards = ({path}) => {
  console.log(path);
  return (
    <View>
      <View
        style={{
          height: 225,
          width: 130,
          backgroundColor: '#fff',
          margin: 8,
          borderRadius: 15,
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 5,
          shadowOpacity: 0.1,
        }}></View>
      <View
        style={{
          height: 225,
          // backgroundColor: '#fff',
          margin: 8,
          position: 'absolute',
          top: 1,
          left: 1,
        }}>
        <Image source={path} />
      </View>
    </View>
  );
};

const ProfileName = ({name}) => {
  return (
    <View style={{alignItems: 'flex-start', marginLeft: 18}}>
      <Text style={{fontSize: 26, fontWeight: 'bold'}}>{name}</Text>
    </View>
  );
};

const ProfileImage = () => {
  return (
    <View style={{marginLeft: 15, marginTop: 20}}>
      <Image source={require('../asset/images/Clipped.png')} />
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <>
      <MainHeader title="VIEW PROFILE" />
      <ScrollView style={{marginTop: 1}}>
        <View style={styles.mainContainer}>
          <View style={styles.mainProfileContainer}>
            <ProfileImage />
            <View>
              <ProfileName name="Ananda Krishnan R" />

              <View style={styles.numbersContainer}>
                <Text style={{fontSize: 22, marginRight: 12}}>8</Text>
                <Text style={{fontSize: 22, marginRight: 8}}>905</Text>
                <Text style={{fontSize: 22, marginRight: 8}}>1.1K</Text>
              </View>
              <View style={styles.numbersDetailContainer}>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>Assets</Text>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                  Followers
                </Text>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                  Following
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.descriptionContainer}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={require('../asset/images/smile.png')}
                  style={{
                    backgroundColor: '#ffbf48',
                    borderRadius: 12,
                    marginLeft: 5,
                  }}
                />
                <Text style={{fontSize: 9, textAlign: 'center'}}>Friendly</Text>
              </View>
              <View style={{marginRight: 10}}>
                <Image
                  source={require('../asset/images/run.png')}
                  style={{
                    backgroundColor: '#0c9aff',
                    borderRadius: 12,
                    marginTop: 5,
                    marginLeft: 18,
                  }}
                />
                <Text style={{fontSize: 9}}>Competitive</Text>
              </View>
              <View>
                <Image
                  source={require('../asset/images/bolt.png')}
                  style={{
                    backgroundColor: '#0dcad4',
                    borderRadius: 16,
                    marginTop: 3,
                  }}
                />
                <Text style={{fontSize: 9}}>Active</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#f1f6fb',
                  paddingHorizontal: 25,
                  borderRadius: 10,
                  marginLeft: 17,
                  width: 150,
                  alignItems: 'center',
                }}>
                <Image source={require('../asset/images/send.png')} />
                <Text style={{marginLeft: 5, padding: 10, fontSize: 14}}>
                  Follow
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.aboutContainer}>
            <Text style={{marginBottom: 5, fontSize: 13, fontWeight: '700'}}>
              I Like to help real people behind real change
            </Text>
            <Text
              style={{
                marginBottom: 5,
                fontSize: 13,
                fontWeight: '700',
                color: '#1557a5',
              }}>
              @neo_kitsch
            </Text>
            <Text style={{marginBottom: 5, fontSize: 13, fontWeight: '700'}}>
              #energy-guru.com
            </Text>
            <Text
              style={{
                marginBottom: 5,
                fontSize: 13,
                fontWeight: '700',
                color: '#1557a5',
              }}>
              @alchimia_organics
            </Text>
            <Pressable>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 13,
                  fontWeight: '700',
                  color: '#1557a5',
                }}>
                Docs.google.com/document/d/1c9B1A5Uf_g7h2mwkm…
              </Text>
            </Pressable>
          </View>

          <View>
            <Text style={styles.networkText}>Networks</Text>
            <View>
              <ScrollView horizontal={true} style={{marginLeft: 4}}>
                <View
                  style={{
                    backgroundColor: '#feedde',
                    // marginLeft: ,
                    marginLeft: 5,
                    borderRadius: 10,
                  }}>
                  <Image
                    style={styles.imgStyle}
                    source={require('../asset/images/01.png')}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: '#ffd8d8',
                    marginLeft: 10,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={require('../asset/images/02.png')}
                    style={styles.imgStyle}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: '#efeded',
                    marginLeft: 10,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={require('../asset/images/03.png')}
                    style={styles.imgStyle}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: '#d9f5ff',
                    marginLeft: 10,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={require('../asset/images/04.png')}
                    style={styles.imgStyle}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: '#ffd8d8',
                    marginLeft: 10,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={require('../asset/images/05.png')}
                    style={styles.imgStyle}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: '#feedde',
                    marginLeft: 10,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={require('../asset/images/06.png')}
                    style={styles.imgStyle}
                  />
                </View>
              </ScrollView>
            </View>
          </View>

          {/* cards */}
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Public Decks</Text>

            <ScrollView
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <Cards path={cardImage1} />
              <Cards path={cardImage2} />
              <Cards path={cardImage3} />
              {/* <Cards />
              <Cards /> */}
              {/* <View
                style={{
                  height: 205,
                  backgroundColor: '#fff',
                  margin: 8,
                }}>
                <Image source={require('../asset/images/img1.png')} />
              </View>

              <View style={{height: 220, backgroundColor: '#fff', margin: 8}}>
                <Image source={require('../asset/images/img2.png')} />
              </View>
              <View style={{height: 220, backgroundColor: '#fff', margin: 8}}>
                <Image source={require('../asset/images/img3.png')} />
              </View> */}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 80,
  },
  mainProfileContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  detailsContianer: {},
  numbersContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    width: '50%',
    marginLeft: 20,
    width: 250,
  },
  numbersDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginRight: 50,
    marginLeft: 10,
    padding: 10,
    width: 260,
  },

  descriptionContainer: {
    flexDirection: 'row',
    // borderWidth: 1,
    marginTop: 15,
    justifyContent: 'space-evenly',
  },
  aboutContainer: {
    marginLeft: 20,
    marginTop: 45,
  },
  imgStyle: {
    margin: 10,
  },
  networkText: {
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 20,
    color: '#2e3e5c',
    fontWeight: 'bold',
  },
  cardText: {
    marginBottom: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardContainer: {
    margin: 15,
  },
});

export default ProfileScreen;
