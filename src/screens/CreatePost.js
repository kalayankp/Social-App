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
import InputBox from '../components/CreateReel/InputBox';
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

  const handleInputChange = (value) => {
    setDescription(value)
  };


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
    let uploadedImageUrls = [];
    let uploadedVideoUrls = [];

    for (let i = 0; i < selectedMedia.length; i++) {
      const media = selectedMedia[i];
      const fileName = media.path.split('/').pop();
      const fileExt = fileName.split('.').pop();
      const filePath = `${Date.now()}.${fileExt}`;

      const file = {
        uri: media.path,
        name: fileName,
        type: media.mime,
      };

      if (media.mime.startsWith('image/')) {
        // Upload images to the 'image' folder
        const { data, error } = await supabase.storage
          .from('hashx-reels/image')
          .upload(filePath, file);

        if (error) {
          console.log('Error uploading image:', error);
        } else {
          console.log('Image uploaded successfully:', data);
          const publicURL = supabase.storage.from('hashx-reels/image').getPublicUrl(filePath);
          uploadedImageUrls.push(publicURL.data.publicUrl);
          console.log('Public Image URL:', publicURL);
        }
      } else if (media.mime.startsWith('video/')) {
        // Upload videos to the 'video' folder
        const { data, error } = await supabase.storage
          .from('hashx-reels/video')
          .upload(filePath, file);

        if (error) {
          console.log('Error uploading video:', error);
        } else {
          console.log('Video uploaded successfully:', data);
          const publicURL = supabase.storage.from('hashx-reels/video').getPublicUrl(filePath);
          uploadedVideoUrls.push(publicURL.data.publicUrl);
          console.log('Public Video URL:', publicURL);
        }
      }
    }

    setLoading(false);
    setSelectedMedia([]);
    setDescription('');

    console.log('Uploaded Image URLs:', uploadedImageUrls);
    console.log('Uploaded Video URLs:', uploadedVideoUrls);
    uploadPost(uploadedImageUrls, uploadedVideoUrls);
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

  const uploadPost = async (uploadedImageUrls, uploadedVideoUrls) => {
    const contentArray = [];
  
    // Add image objects to the contentArray
    for (const imageUrl of uploadedImageUrls) {
      contentArray.push({
        url: imageUrl,
        mimetype: 'img',
      });
    }
  
    // Add video objects to the contentArray
    for (const videoUrl of uploadedVideoUrls) {
      contentArray.push({
        url: videoUrl,
        mimetype: 'video',
      });
    }
  console.log('contentArray', contentArray);
    const contentJSON = contentArray;
  
    const { data, error } = await supabase.from('Post').insert([
      {
        IdentityUUID: '00000000-0000-0000-0000-000000000003',
        Description: description,
        Content: contentJSON, 
      },
    ])
  
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
      {/* <TextInput
        style={styles.descriptionInput}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="black"
        multiline={true}
        numberOfLines={4}
      /> */}
       <InputBox onInputChange={handleInputChange} />
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