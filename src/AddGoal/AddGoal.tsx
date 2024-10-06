import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import GradientBackgroundWrapper from "../components/GradientBackgroundWrapper/GradientBackgroundWrapper";
import Dropdown from "../components/Dropdown/Dropdown";
import Textbox from "../components/Textbox/Textbox";
import goalCategories from "./goalCategories";

const dummyGoals = [
  {
    title: "Morning Run",
    description: "Run 5km in the parks",
    category: "Fitness",
    alertTime: "2024-10-01T07:00:00"
  },
  {
    title: "Investing 101",
    description: "Watch an online course about investing",
    category: "Finance",
    alertTime: "2024-10-01T20:00:00"
  },
  {
    title: "Team Meeting",
    description: "Discuss project updates with the team",
    category: "Career",
    alertTime: "2024-10-02T10:00:00"
  }
]

const Goals = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [goalTitle, setGoalTitle] = useState<string | undefined>("");
  const [details, setDetails] = useState<string | undefined>("");

  return (
    <GradientBackgroundWrapper>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Inter-SemiBold' }}>Add Goal</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <View>
            <Textbox onTextChange={setGoalTitle} header="Goal Title"/>
          </View>
          <View style={{marginTop: 20, height: 150}}>
            <Textbox onTextChange={setDetails} style={{height: '100%'}} header="Details"/>
          </View>
          <View style={{marginTop: 40}}>
            <Dropdown placeholder="Select" header="Goal Type" itemArr={goalCategories.map(c => c.category)}/>
          </View>
          
        </View>
      </View>
    </GradientBackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop: 50,
    width: '100%',
    paddingHorizontal: 20,
  }
})

export default Goals;
