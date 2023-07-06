import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

// Initialize Supabase client with your Supabase project URL and public API key
const supabase = createClient('https://hvvrkmvdbhxivmykshhi.supabase.co', 'YOUR_API_KEY', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const App = () => {
  const [selectedMedia, setSelectedMedia] = useState([]);

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
    for (const media of selectedMedia) {
      const fileData = await supabase.storage
        .from('media')
        .upload(`media/${media.path}`, media.data);

      // Get the public URL of the uploaded file
      const publicURL = supabase.storage
        .from('media')
        .getPublicUrl(`media/${media.path}`);

      console.log('File uploaded:', fileData);
      console.log('Public URL:', publicURL);
    }
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

      <Button title="Select Media" onPress={openMediaPicker} />
      <Button title="Upload to Supabase" onPress={uploadMediaToSupabase} />
    </View>
  );
};

export default App;
