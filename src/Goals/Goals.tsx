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
    for (let currDayOffset = 0; currDayOffset < 7; currDayOffset++) {
      days.push(startOfWeek(currDate, currDayOffset));
    }

    setDaysOfWeek(days);
  }, []);

  return (
    <GradientBackgroundWrapper>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Inter-SemiBold' }}>My Goals</Text>
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
          <View style={{marginTop: 30, marginBottom: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View>
                <Text style={{fontFamily: 'Inter-Regular', color: '#7F7F7F', fontSize: 12, paddingBottom: 7}}>Showing Results</Text>
                <Text style={{fontFamily: 'Inter-Bold', fontSize: 16}}>Habits List</Text>
              </View>
              <Pressable onPress={() => nav.navigate('Add Goal', {screen: 'AddGoalScreen'})}>
                <Text style={{fontFamily: 'Inter-Bold', color: DailyDriveColors.dailyDriveDarkGreen}}>Add New</Text>
              </Pressable>
            </View>
            <SafeAreaView style={{ height: 64 * 5 }}>
              <FlatList
                data={dummyGoals}
                renderItem={({ item }) => (
                  <GestureHandlerRootView style={{ backgroundColor: DailyDriveColors.dailyDriveGreen, borderRadius: 5 }}>
                    <Swipable icon="trash-alt">
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
