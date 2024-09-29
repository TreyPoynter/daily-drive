import { DailyDriveColors } from "../../colors";
import { Pressable, TouchableOpacity, Text, GestureResponderEvent, StyleSheet } from "react-native";

interface ButtonProps {
  text: string,
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined
}

const Button: React.FC<ButtonProps> = ({ text, onPress }) => {
    return(
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress ? (e) => onPress(e) : () => {}}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: DailyDriveColors.dailyDriveGreen,
    paddingVertical: 25,
    borderRadius: 5
  },
  text: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    fontSize: 14
  }
})

export default Button;
