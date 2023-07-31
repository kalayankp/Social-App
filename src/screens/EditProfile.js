import React from 'react';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Platform,
  TouchableOpacity,
  TextInput

} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import {cardImage1, cardImage2, cardImage3} from '../asset/images/index';

import MainHeader from '../components/MainHeader';
import RightIcons from '../components/RightIcons';
import metrics from '../contents/metrics';



const Cards = ({path}) => {
  console.log(path);
  return (
    <View>
      <View
        style={{
          height: 225,
          width: 130,

          // height: metrics.width / 3,
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
      <Text style={{fontSize: 26, fontWeight: 'bold', color: '#4b5872'}}>
        {name}
      </Text>
    </View>
  );
};

const ProfileImage = ({navigation}) => {

  const handleEditProfile =()=> {
   navigation.navigate('Edit')
  }
  return (
    <View style={{ marginTop: 20,
      marginHorizontal: 8,
      position: 'relative',}}>
    <Image source={require('../asset/images/Clipped.png')} style={styles.profileImage} />
    <TouchableOpacity style={styles.editEllipseIcon}>
    <Image source={require('../asset/images/ed.png')} />
    </TouchableOpacity>
    <TouchableOpacity onPress={handleEditProfile}style={styles.editProfileIcon} >
      <Icon name="pencil" size={15} color="white" />
      </TouchableOpacity>
  </View>
  );
};

const ProfileScreen = () => {

  const [username, setUsername] = useState('neo_kitsch'); 
  const [bio, setBio] = useState(
    'I Like to help real people behind real change\n#energy-guru.com\n@alchimia_organics\nDocs.google.com/document/d/1c9B1A5Uf_g7h2mwkm…'
  ); 

  return (
    <View style={{flex: 1, backgroundColor: 'white', marginHorizontal: 3}}>
      <MainHeader title="VIEW PROFILE" rightComponent={RightIcons} />
      <ScrollView style={{marginTop: 1, flex: 1}}>
        <View style={styles.mainContainer}>
          <View style={styles.mainProfileContainer}>
            <ProfileImage />
            <View style={{flex: 1, paddingRight: 10}}>
              <ProfileName name="Ananda Krishnan R" />

              <View style={styles.numbersContainer}>
                <Text style={{fontSize: 22, marginRight: 12, color: '#2e3e5c'}}>
                  8
                </Text>
                <Text style={{fontSize: 22, marginRight: 8, color: '#2e3e5c'}}>
                  905
                </Text>
                <Text style={{fontSize: 22, marginRight: 8, color: '#2e3e5c'}}>
                  1.1K
                </Text>
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
              <View style={{justifyContent: 'center', marginHorizontal: 8}}>
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
              <View style={{marginHorizontal: 8}}>
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
              <View style={{marginHorizontal: 8}}>
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
                  paddingHorizontal: 30,
                  borderRadius: 10,
                  marginLeft: 30,
                  // width: 150,
                  alignItems: 'center',
                }}>
              <Icon name="pencil" size={15} color="black" />
                <Text style={{marginRight:2, padding: 10, fontSize: 14}}>
                  Update Profile
                </Text>
              </View>
            </View>
          </View>

        <View style={styles.container}>
      <TextInput
        style={styles.usernameInput}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.bioInput}
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
        multiline={true}
      />
    </View>

          <View>
            <Text style={styles.networkText}>Networks</Text>
            <View style={{}}>
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
              <Cards path={cardImage3} />
              <Cards path={cardImage3} />
              <Cards path={cardImage3} />
              <Cards path={cardImage3} />
              <Cards path={cardImage3} />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: Platform.OS === 'android' ? 40 : 80,
  },
  mainProfileContainer: {
    // justifyContent: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  detailsContianer: {},
  numbersContainer: {
    flexDirection: 'row',
    padding: 10,

    justifyContent: 'space-between',
    marginLeft: 20,
  },
  numbersDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginRight: 50,
    marginLeft: 10,
    padding: 10,
  },

  descriptionContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // borderWidth: 1,
    marginTop: 15,
    // justifyContent: 'center',
    // justifyContent: 'space-evenly',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  usernameInput: {
    marginBottom: 20,
    fontSize: 13,
    fontWeight: '700',
    color: '#1557a5',
    borderBottomWidth: 1,
    borderBottomColor: '#1557a5',
    paddingBottom: 5,

  },
  bioInput: {
    marginBottom: 20,
    fontSize: 13,
    fontWeight: '700',
    color: '#1557a5',
    borderBottomWidth: 1,
    borderBottomColor: '#1557a5',
    paddingBottom: 5,
  },
  imgStyle: {
    margin: 10,
  },
  networkText: {
    // textAlign: 'center',
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
    color: '#2e3e5c',
  },
  cardContainer: {
    margin: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  editEllipseIcon: {
    position: 'absolute',
    bottom: 72,
    right: 7,
  },
  editProfileIcon: {
    position: 'absolute',
    top: 1,
    marginLeft:4,
    right: 10,
    backgroundColor: 'transparent',
    padding: 5,
  },
});

export default ProfileScreen;