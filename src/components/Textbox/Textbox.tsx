import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { DailyDriveColors } from "../../colors";

interface TextboxProps {
  header?: string,
  fa5Icon?: string,
  placeholder?: string,
  isSecure?: boolean,
  style?: any;
  onTextChange: React.Dispatch<React.SetStateAction<string | undefined>>
}

const Textbox: React.FC<TextboxProps> = ({ header, fa5Icon, placeholder, isSecure = false, onTextChange, style }) => {
  return (
    <>
      {header ? <Text style={styles.header}>{header}</Text> : null}
      <View style={{...styles.textboxContainer, ...style}}>
        {fa5Icon && (
          <Pressable style={styles.iconContainer}>
            <FontAwesome5 name={fa5Icon} size={17} color={DailyDriveColors.dailyDriveGreen} />
          </Pressable>
        )}
        <TextInput
          secureTextEntry={isSecure}
          style={styles.textbox}
          placeholder={placeholder}
          onChangeText={onTextChange}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Inter-Medium',
    paddingBottom: 7,
  },
  textboxContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: DailyDriveColors.border,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textbox: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  iconContainer: {
    padding: 10,
  },
});

export default Textbox;
