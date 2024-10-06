import { View, TextInput, StyleSheet, Text, Pressable, FlatList } from "react-native";
import { DailyDriveColors } from "../../colors";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

interface DropdownProps {
  header?: string;
  itemArr: string[];
  placeholder?: string;
  style?: any;
  onSelectChange: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Dropdown: React.FC<DropdownProps> = ({ header, itemArr, placeholder, onSelectChange, style }) => {
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);

  const toggleDropdown = () => {
    setDisplayDropdown(!displayDropdown);
  };

  const selectItem = (item: string) => {
    setSelectedItem(item);
    onSelectChange(item);
    setDisplayDropdown(false); // Hide dropdown after selection
  };

  return (
    <>
      {header ? <Text style={styles.header}>{header}</Text> : null}
      <Pressable style={{ ...styles.dropdownContainer, ...style }} onPress={toggleDropdown}>
        <Text style={styles.textbox}>
          {selectedItem ? selectedItem : placeholder}
        </Text>
        <FontAwesome5 name="chevron-down" size={20} color="#7F7F7F" />
      </Pressable>

      {displayDropdown && (
        <View style={styles.dropdownList}>
          <FlatList
            data={itemArr}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => selectItem(item)} style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Inter-Medium',
    paddingBottom: 7,
  },
  dropdownContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: DailyDriveColors.border,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  textbox: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  dropdownList: {
    borderWidth: 0.5,
    borderColor: DailyDriveColors.border,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: 'none',
    zIndex: 999,
    maxHeight: 110
  },
  dropdownItem: {
    padding: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: DailyDriveColors.border,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});

export default Dropdown;
