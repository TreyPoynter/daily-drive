import { Pressable, Text, View, StyleSheet } from "react-native"
import { logoutUser } from "../services/userService";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ProfileProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Function type for setIsLoggedIn
}

export const Profile: React.FC<ProfileProps> = ({ setIsLoggedIn }) => {

  const nav = useNavigation<NativeStackNavigationProp<any>>();
  console.log(setIsLoggedIn)
  return (
    <View style={styles.container}>
      <Pressable onPress={() => logoutUser(nav, setIsLoggedIn)}>
        <Text>CLICK ME</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Profile;