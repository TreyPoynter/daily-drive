import { Text, View, StyleSheet, Pressable, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { DailyDriveColors } from "../colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import GradientBackgroundWrapper from "../components/GradientBackgroundWrapper/GradientBackgroundWrapper";
import DateCard from "../components/DateCard/DateCard";
import { startOfWeek } from "../utilities";
import Swipable from "../components/Swipable/Swipable";
import { GoalListItem } from "../components/TodaysGoalList/TodaysGoalList";

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
  const [daysOfWeek, setDaysOfWeek] = useState<Date[]>([]);
  const [currSelectedDate, setCurrSelectedDate] = useState<Date | undefined>();

  useEffect(() => {
    const currDate = new Date();
    setCurrSelectedDate(currDate);

    const days = [];
    for (let currDay = 0; currDay < 7; currDay++) {
      days.push(startOfWeek(currDate, currDay)); // adjust as needed
    }

    setDaysOfWeek(days);
  }, []);

  return (
    <GradientBackgroundWrapper>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={() => nav.navigate('Home')}>
            <FontAwesome6 name="angle-left" size={24} color="black" />
          </Pressable>
          <Text style={{ marginLeft: '36.5%', fontFamily: 'Inter-SemiBold' }}>My Goals</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontFamily: 'Inter-SemiBold', marginBottom: 7 }}>Select</Text>
          <SafeAreaView>
            <FlatList
              horizontal={true}
              data={daysOfWeek}
              renderItem={({ item }) =>
                <>
                  <TouchableOpacity activeOpacity={0.4} onPress={() => setCurrSelectedDate(item)}>
                    <DateCard date={item}
                      isSelected={item.getDate() === currSelectedDate?.getDate() &&
                        item.getMonth() === currSelectedDate?.getMonth() &&
                        item.getFullYear() === currSelectedDate?.getFullYear()}
                    />
                  </TouchableOpacity>
                </>
              }
              keyExtractor={item => item.getDate()}
            />
          </SafeAreaView>
          <View>
            <SafeAreaView style={{ height: 64 * 5 }}>
              <FlatList
                data={dummyGoals}
                renderItem={({ item }) => (
                  <GestureHandlerRootView style={{ backgroundColor: DailyDriveColors.dailyDriveGreen, borderRadius: 5 }}>
                    <Swipable>
                      <GoalListItem title={item.title} category={item.category} description={item.description} />
                    </Swipable>
                  </GestureHandlerRootView>

                )}
                keyExtractor={item => item.description}
              />
            </SafeAreaView>
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
