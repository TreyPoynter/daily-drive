import { Text, View, StyleSheet, Pressable } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const AddGoal = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => nav.goBack()}>
        <Text>GO BACK</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddGoal;
