import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { supabase } from '../utils/supabase';
import metrics from '../contents/metrics';
import {
  cardImage1,
  cardImage2,
  cardImage3,
} from '../asset/images/index';
import MainHeader from '../components/MainHeader';
import RightIcons from '../components/RightIcons';
const Cards = ({ path }) => {

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
          shadowOffset: { width: 0, height: 5 },
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

const ProfileScreen = ({ profileImageUrl, onEditImage }) => {
  const [user, setUser] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [profileName, setProfileName] = useState('User name'); 

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: usersData, error } = await supabase
        .from('UserInfo')
        .select('id, profile_image_url, username, bio');
      console.log(usersData);
      if (error) {
        console.error('Error fetching user data:', error.message);
        return;
      }

      const userData = usersData[4];
      setUser(userData);
      setNewUsername(userData.username);
      setNewBio(userData.bio);
      setProfileName(userData.username); // Update the profile name
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };


  const handleEditClick = userId => {
    const userToEdit = user;
    setEditingUserId(userId);
    setNewUsername(userToEdit.username);
    setNewBio(userToEdit.bio);
    setNewImage(userToEdit.profile_image_url);
  };

  const handleImageUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
      });
  
      if (image) {
        setNewImage(image.path);
      }
    } catch (error) {
      if (error.message !== 'User cancelled image selection') {
        console.error('Error selecting image:', error.message);
      }
    }
  };
  

  const handleSaveChanges = async userId => {
    try {
      if (newImage) {
        const fileExtension = newImage.split('.').pop();
        const { data, error } = await supabase.storage
          .from('hashx-reels') 
          .upload(`user_${userId}.${fileExtension}`, newImage);
  
        if (error) {
          console.error('Error uploading image:', error.message);
          return;
        }
  
        const profileImageUrl = data.Key;
        await supabase.from('UserInfo').update({ profile_image_url: profileImageUrl }).eq('id', userId);
      }
  
      if (newUsername || newBio) {
        await supabase.from('UserInfo').update({ username: newUsername, bio: newBio }).eq('id', userId);
      }
  
      setEditingUserId(null);
      setNewUsername('');
      setNewBio('');
      setNewImage(null);
  
      await fetchUserData(); 
    } catch (error) {
      console.error('Error saving changes:', error.message);
    }
  };
  
  

  const ProfileName = ({ name }) => {
    return (
      <View style={styles.profileNameContainer}>
        <Text style={styles.profileName}>{name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <MainHeader title="Profile" rightComponent={RightIcons} />
      <ScrollView style={{ marginTop: 1 }}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={handleImageUpload}>
              <Avatar
           source={{ uri: 'https://hvvrkmvdbhxivmykshhi.supabase.co/storage/v1/object/public/hashx-reels/image/1690644235349.jpg' }}
                containerStyle={styles.avatarContainer}
              />
              <TouchableOpacity style={styles.editEllipseIcon}>
                <Image source={require('../asset/images/Ellipse.png')} />
              </TouchableOpacity>
              {editingUserId !== null ? (
            <Icon
              name="save"
              size={15}
              color="white"
              style={styles.editProfileIcon}
              onPress={() => handleSaveChanges(user?.id)}
            />
          ) : (
            <Icon
              name="pencil"
              size={15}
              color="white"
              style={styles.editProfileIcon}
              onPress={() => handleEditClick(user?.id)}
            />
          )}

            </TouchableOpacity>
          </View>
          

          <View style={{ flex: 1, paddingRight: 10 }}>
            <View style={styles.profileNameContainer}>
              <Text style={styles.profileName}>{profileName}</Text>
            </View>

            <View style={styles.numbersContainer}>
              <Text style={{ fontSize: 22, marginRight: 12, color: '#2e3e5c' }}>
                8
              </Text>
              <Text style={{ fontSize: 22, marginRight: 8, color: '#2e3e5c' }}>
                905
              </Text>
              <Text style={{ fontSize: 22, marginRight: 8, color: '#2e3e5c' }}>
                1.1K
              </Text>
            </View>
            <View style={styles.numbersDetailContainer}>
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Assets</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                Followers
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                Following
              </Text>
            </View>

          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={{ justifyContent: 'center', marginHorizontal: 8 }}>
            <Image
              source={require('../asset/images/smile.png')}
              style={{
                backgroundColor: '#ffbf48',
                borderRadius: 12,
                marginLeft: 5,
              }}
            />
            <Text style={{ fontSize: 9, textAlign: 'center' }}>Friendly</Text>
          </View>
          <View style={{ marginHorizontal: 8 }}>
            <Image
              source={require('../asset/images/run.png')}
              style={{
                backgroundColor: '#0c9aff',
                borderRadius: 12,
                marginTop: 5,
                marginLeft: 14,
              }}
            />
            <Text style={{ fontSize: 9 }}>Competitive</Text>
          </View>
          <View style={{ marginHorizontal: 8 }}>
            <Image
              source={require('../asset/images/bolt.png')}
              style={{
                backgroundColor: '#0dcad4',
                borderRadius: 16,
                marginTop: 3,
              }}
            />
            <Text style={{ fontSize: 9 }}>Active</Text>
          </View>

        </View>


      

        <View style={styles.updateButtonContainer}>
      <TouchableOpacity onPress={editingUserId !== null ? () => handleSaveChanges(user?.id) : () => handleEditClick(user?.id)}>
        <Text style={styles.updateButton}>{editingUserId !== null ? 'Save Profile' : 'Edit Profile'}</Text>
      </TouchableOpacity>
    </View>

        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.usernameInput}
            value={editingUserId === null ? user?.username || '' : newUsername}
            onChangeText={setNewUsername}
            placeholder="Username"
            editable={editingUserId !== null}
          />

          <TextInput
            style={styles.bioInput}
            value={editingUserId === null ? user?.bio || '' : newBio}
            onChangeText={setNewBio}
            placeholder="Bio"
            multiline={true}
            editable={editingUserId !== null}
          />
        </View>

        <View>
          <Text style={styles.networkText}>Networks</Text>
          <View style={{ bottom: 50 }}>
            <ScrollView horizontal={true} style={{ marginLeft: 4 }}>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 3,
    marginBottom: Platform.OS === 'android' ? 40 : 80,

  },
  profileContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  profileImageContainer: {
    marginTop: 20,
    marginHorizontal: 8,
    position: 'relative',
  },
  profileDetailsContainer: {
    flex: 1,
    paddingRight: 10,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    bottom: 4

  },
  editEllipseIcon: {
    position: 'absolute',
    marginLeft: '65%',
    resizeMode: 'cover',

  },
  editProfileIcon: {
    position: 'absolute',
    marginLeft: 4,
    right: 14,
    backgroundColor: 'transparent',
    top: 6

  },
  numbersContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    marginLeft: 20,
    top: 10,
  },
  numbersDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    padding: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  profileNameContainer: {
    alignItems: 'flex-start',
    marginLeft: 30,
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4b5872',
  },
  updateButtonContainer: {
    backgroundColor: '#f1f6fb',
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: '45%',
    bottom: 40,
    width: '50%',
    alignItems: 'center',
  },
  updateButton: {
    padding: 10,
    fontSize: 14,
  },
  inputsContainer: {
    flex: 1,
    padding: 20,
    bottom: 30,
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
  networkText: {
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 20,
    color: '#2e3e5c',
    fontWeight: 'bold',
    bottom: 50,
  },
  cardContainer: {
    margin: 15,
    bottom: 50,
  },
  cardText: {
    marginBottom: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e3e5c',
  },
  imgStyle: {
    margin: 10,
  },

});
export default ProfileScreen