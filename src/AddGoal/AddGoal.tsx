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
    console.log(newGoal);
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <Pressable onPress={() => nav.goBack()}>
        <Text>{'<'}</Text>
      </Pressable>
      <TextInput style={styles.text} placeholder="Title" onChangeText={setTitle}/>
      <TextInput style={styles.text} placeholder="Description" onChangeText={setDescription}/>
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
  },
  text: {
    fontSize: 20,
    borderColor: '#000',
    borderWidth: 1.5,
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 8
  }
})

export default AddGoal;
