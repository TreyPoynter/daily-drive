import { Text, View, StyleSheet, Pressable, TextInput, Keyboard, KeyboardAvoidingView } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import goalCategories from "./goalCategories";
import SearchableDropdown from "../components/SearchableDropdown/SearchableDropdown";

const AddGoal = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [alertTime, setAlertTime] = useState<Date | undefined>(undefined);

  const createGoal = () => {
    const newGoal = {
      title: title,
      description: description,
      category: category,
      alertTime: alertTime
    }
    console.log(newGoal)
  }

  return (
    <Pressable onPress={() => Keyboard.dismiss} style={styles.container}>
      <Pressable onPress={() => nav.goBack()}>
        <Text>{'<'}</Text>
      </Pressable>
      <SearchableDropdown options={goalCategories.map(c => c.category)} onOptionSelected={setCategory}/>
      <Pressable onPress={createGoal}>
        <Text>{'ADD GOAL'}</Text>
      </Pressable>
    </Pressable>
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
