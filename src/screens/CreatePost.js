import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  ActivityIndicator,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import { supabase } from '../utils/supabase';
import { useNavigation } from '@react-navigation/native';
import MediaDisplay from '../components/CreateReel/MediaDisplay';

const CreatePost = () => {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const navigation = useNavigation();
  const [publicUrls, setPublicUrls] = useState([]);

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
    setLoading(true);

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
        setPublicUrls((prevUrls) => [...prevUrls, publicURL.data.publicUrl]);
        console.log('Public URL:', publicURL.data.publicUrl);
      }
    }
    setLoading(false);
    console.log('Public URLs:', publicUrls);
    uploadPost();
  };

  const navigateToVideoScreen = (media) => {
    navigation.navigate('VideosScreen', { media });
  };

  const resetSelectedMedia = () => {
    setSelectedMedia([]);
  };

  const getLocation = () => {
    // Fetch location
  };

  const uploadPost = async () => {
    console.log("final data",publicUrls)
    const { data, error } = await supabase.from('Post').insert([
      {
        IdentityUUID: '00000000-0000-0000-0000-000000000003',
        Description: description,
        ContentURL: publicUrls,
      },
    ]
    );
    if (error) {
      console.log('Error creating post:', error);
    } else {
      console.log('Post created successfully:', data);
    }
  };

  const onSave = () => {
    if (selectedMedia.length === 0) {
      alert("no media selected")
      return;
    }
    uploadMediaToSupabase();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     <MediaDisplay selectedMedia={selectedMedia} openMediaPicker={openMediaPicker} />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="black"
        multiline={true}
        numberOfLines={4}
      />
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  
  },
  descriptionInput: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    margin:'5%',
    marginBottom: 10,
    width: '90%',
    color: '#000000',
    textAlignVertical: 'top'
  },
  saveButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'flex-end',
    marginEnd : '5%'
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePost;