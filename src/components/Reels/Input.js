import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

export default Input = () => {
  const editor = useRef();

  function handlePress() {
    editor.current?.blurContentEditor();
  }

  return (
    <View style={{ flex: 1 }}>
      <RichEditor
        ref={editor}
        placeholder={'Type something...'}
        initialContentHTML={'Hello <b>World</b>!'}
        style={{ flex: 1 }}
      />
      <RichToolbar
        style={{ backgroundColor: '#eee' }}
        editor={editor}
        selectedIconTint={'#2095F2'}
        disabledIconTint={'#bfbfbf'}
        onPressAddImage={() => console.log('onPressAddImage')}
        iconTint={'black'}
        actions={[
          'bold',
          'italic',
          'underline',
          'unorderedList',
          'orderedList',
          'code',
          'blockquote',
          'image',
          'link',
        ]}
      />
      <Button title="Blur editor" onPress={handlePress} />
    </View>
  );
}