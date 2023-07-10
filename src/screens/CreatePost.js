import React, { useState } from 'react';
import { View, Button, Image, ActivityIndicator, Text , Video } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { supabase } from '../utils/supabase';

const CreatePost = () => {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  const openMediaPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
      multiple: true,
    })
      .then((media) => {
        setSelectedMedia(media);
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
      }

      const publicURL = supabase.storage
        .from('hashx-reels')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicURL);
    }

    setLoading(false); // Set loading state to false
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedMedia.map((media, index) => (
        <View key={index}>
          {media.mime.startsWith('image/') ? (
            <>
              <Image
                source={{ uri: media.path }}
                style={{ width: 200, height: 200 }}
              />
              <Text>{media.mime}</Text>
            </>
          ) : (
            <>
              <Video
                source={{ uri: media.path }}
                style={{ width: 300, height: 200 }}
                controls
              />
              <Text>{media.mime}</Text>
            </>
          )}
        </View>
      ))}

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          <Button title="Select Media" onPress={openMediaPicker} />
          <Button title="Upload to Supabase" onPress={uploadMediaToSupabase} />
        </>
      )}
    </View>
  );
};

export default CreatePost;
