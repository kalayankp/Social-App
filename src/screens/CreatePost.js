import React, { useState, useEffect } from 'react';
import { View, Button, Image, ActivityIndicator, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from 'react-native-geolocation-service';
import { supabase } from '../utils/supabase';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
const CreatePost = () => {
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

      const { data, error } = await supabase.storage
        .from('hashx-reels')
        .upload(filePath, file);

      if (error) {
        console.log('Error uploading file:', error);
      } else {
        console.log('File uploaded successfully:', data);
        const publicURL = supabase.storage
          .from('hashx-reels')
          .getPublicUrl(filePath);
        setPublicURL(oldArray => [...oldArray,publicURL.data.publicUrl] );
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
    const { data, error } = await supabase
          .from('Post')
          .insert([
            {
              IdentityUUID : "00000000-0000-0000-0000-000000000003",
              Description  : description,
              ContentURL : publicurls,
              
              // address,
              // title
            },
          ]);

        if (error) {
          console.log('Error creating post:', error);
        } else {
          console.log('Post created successfully:', data);
        }
      }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mediaContainer}>
        {selectedMedia.map((media, index) => (
          <View key={index}>
            {media.mime.match('image/') ? (
              <>
                <Image source={{ uri: media.path }} style={styles.image} />
                <Text>{media.mime}</Text>
              </>
            ) : (
              <>
                <Button title={media.path.split('/').pop()} onPress={() => navigateToVideoScreen(media)} />
                <Text>{media.mime}</Text>
              </>
            )}
          </View>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#000" 
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#000" 
      />

      <Text>{address}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View style={styles.buttonContainer}>
          {selectedMedia.length === 0 ? (
            <Button title="Select Media" onPress={openMediaPicker} color="#FFA500" />
          ) : (
            <Button title="Reset" onPress={resetSelectedMedia} color="#FFA500" />
          )}

          {selectedMedia.length !== 0 ? (
            <Button title="Next" onPress={uploadMediaToSupabase} color="#FFA500" />
          ) : null}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#000000', // Set background color to black
  },
  mediaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
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

});

export default CreatePost;
