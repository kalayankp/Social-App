import React, { useEffect, useState } from 'react';
import { View, Picker  , Text } from '@react-native-picker/picker';

export default function DynamicDropdown(){
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Fetch options from your API
  }, []);

  return (
    <View>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        <Picker.Item label="Select an option" value="" />
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};
