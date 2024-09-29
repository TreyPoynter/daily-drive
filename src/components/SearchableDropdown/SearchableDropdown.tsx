import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet
} from "react-native";

interface SearchableDropdownProps {
  options: string[],
  onOptionSelected: (option: string) => void,
  placeholder?: string
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options, onOptionSelected, placeholder = "Search..." }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);

  const filterOptions = (text: string) => {
    setSearchText(text);
    setFilteredOptions(options.filter((option) => option.includes(text)));
  };

  const onOptionPress = (option: string) => {
    setSearchText(option);
    setFilteredOptions(options);
    onOptionSelected(option);
    setShowOptions(false);
  };

  return (
    <View>
      <TextInput 
        style={styles.textBox} 
        value={searchText} 
        onFocus={() => setShowOptions(true)} 
        onChangeText={filterOptions} 
        placeholder={placeholder} 
      />
      {showOptions && (
        <FlatList
          data={filteredOptions}
          style={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {onOptionPress(item); setShowOptions(false)}}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: {
    borderColor: '#000',
    borderWidth: 1.5,
    paddingVertical: 5,
    paddingHorizontal: 40,
    maxWidth: 300,
    textAlign: 'left',
    borderRadius: 8
  },
  list: {
    maxHeight: 100
  }
});

export default SearchableDropdown;
