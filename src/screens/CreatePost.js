import React, { useState, useEffect } from 'react';
import { View, Button, Image, ActivityIndicator, Text, StyleSheet, ScrollView, TextInput, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from 'react-native-geolocation-service';
import { supabase } from '../utils/supabase';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from 'react-native-elements';
import Video from 'react-native-video';
import ReelCard from  "../components/ReelsUpdated/ReelCard"

const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  
const CreatePost = () => {


  const AppBar = () => {
    return (
      <View style={styles.appBarContainer}>
        <Icon  raised reverse name="plus" type="font-awesome" color="#FFA500" onPress={openMediaPicker} />
      </View>
    );
  };

  const AppBar2 = () => {
    return (
      <View style={styles.appBarContainer}>
        <Icon   raised reverse  name="undo" color="#FFA500" onPress={resetSelectedMedia} />
        <Icon   raised reverse  name="upload" type="font-awesome" color="#FFA500"  onPress={uploadMediaToSupabase}/>
      </View>
    );
  };

  const [selectedMedia, setSelectedMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const navigation = useNavigation();
  const [publicurls, setPublicURL] = useState([]);
  
  
  useEffect(() => {
    getLocation();
  }, []);

  const openMediaPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
      multiple: true,
    })
      .then((media) => {
        setSelectedMedia(media);
        console.log(media);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadMediaToSupabase = async () => {
    setLoading(true); // Set loading state to true

    for (const media of selectedMedia) {
      const fileName = media.path.split('/').pop();
      const fileExt = fileName.split('.').pop();
      const filePath = `${Date.now()}.${fileExt}`;

      const file = {
        uri: media.path,
        name: fileName,
        type: media.mime,
      };

      const { data, error } = await supabase.storage.from('hashx-reels').upload(filePath, file);

      if (error) {
        console.log('Error uploading file:', error);
      } else {
        console.log('File uploaded successfully:', data);
        const publicURL = supabase.storage.from('hashx-reels').getPublicUrl(filePath);
        setPublicURL((oldArray) => [...oldArray, publicURL.data.publicUrl]);
        console.log('P : ', publicURL.data.publicUrl);
      }
    }

    setLoading(false); // Set loading state to false
    console.log('Public URL:', publicurls);
    uploadPost();
  };

  const navigateToVideoScreen = (media) => {
    navigation.navigate('VideosScreen', { media });
  };

  const resetSelectedMedia = () => {
    setSelectedMedia([]);
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Use latitude and longitude to fetch address using a geocoding API
        // Replace the API call with your preferred geocoding solution
      },
      (error) => {
        console.log('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const uploadPost = async () => {
    const { data, error } = await supabase.from('Post').insert([
      {
        IdentityUUID: '00000000-0000-0000-0000-000000000003',
        Description: description,
        ContentURL: publicurls,
        // address,
        // title
      },
    ]);

    if (error) {
      console.log('Error creating post:', error);
    } else {
      console.log('Post created successfully:', data);
    }
  };

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView horizontal={true}>
        <View style={styles.mediaContainer}>
          {selectedMedia.map((media, index) => (
            <View key={index} style={styles.imageContainer}>
              {
                (media.mime.match("image/"))?(<Image source={{ uri: media.path }} style={styles.image} />):
                (
                <Video
                  style={styles.video}
                source={{uri : media.path}}
                resizeMode="contain"
                controls
                />
                  )
              }
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
    {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View>
          {selectedMedia.length === 0 ? (
            <AppBar/>
          ) : (
            <AppBar2/>
          )}
        </View>
      )}
   
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: screenWidth,
    height: screenHeight,
    
  },
  video : {
    width: screenWidth,
    height: screenHeight,
  },
  buttonContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    color: '#000000',
  },
  appBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    height: 60,
  },
});

export default CreatePost;
