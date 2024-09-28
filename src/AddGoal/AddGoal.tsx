import { Text, View, StyleSheet, Pressable } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const AddGoal = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => nav.goBack()}>
        <Text>{'<'}</Text>
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
