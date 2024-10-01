import { View, StyleSheet, Text, FlatList, SafeAreaView, PanResponder, Animated } from "react-native";
import { useRef } from "react";
import goalCategories from "../../AddGoal/goalCategories";
import { FontAwesome5 } from "@expo/vector-icons";
import { DailyDriveColors } from "../../colors";
import Swipable from "../Swipable/Swipable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
  },
  {
    title: "Healthy Meal Prep",
    description: "Prepare a week's worth of healthy meals",
    category: "Nutrition",
    alertTime: "2024-10-02T17:30:00"
  },
  {
    title: "Yoga Session",
    description: "Attend online yoga class",
    category: "Health",
    alertTime: "2024-10-03T06:30:00"
  },
  {
    title: "Client Call",
    description: "Call the client to discuss contract details",
    category: "Career",
    alertTime: "2024-10-03T14:00:00"
  },
  {
    title: "Evening Meditation",
    description: "Relax with a 15-minute meditation",
    category: "Mental",
    alertTime: "2024-10-04T21:00:00"
  },
  {
    title: "Read a Book",
    description: "Finish reading 'Atomic Habits'",
    category: "Education",
    alertTime: "2024-10-04T19:00:00"
  },
  {
    title: "Weekend Hike",
    description: "Hike in the nearby nature reserve",
    category: "Environment",
    alertTime: "2024-10-06T08:00:00"
  },
  {
    title: "Catch up with Friends",
    description: "Video call with high school friends",
    category: "Social",
    alertTime: "2024-10-06T16:00:00"
  },
  {
    title: "Catch up with Friends",
    description: "Video call with high school friends",
    category: "Social",
    alertTime: "2024-10-06T16:00:00"
  },
];

interface GoalListItemProps {
  title: string,
  description: string,
  category: string
}

const GoalListItem: React.FC<GoalListItemProps> = ({ title, description, category }) => {
  const foundCategory = goalCategories.find((item) => item.category === category)?.icon ?? 'ellipsis-h';

  return (
    <View style={styles.listItemContainer}>
      <View style={styles.right}>
        <View style={styles.iconStyle}>
          <FontAwesome5 name={foundCategory} size={12} color={DailyDriveColors.dailyDriveGreen} />
        </View>
        <View style={{ justifyContent: 'space-between', width: '80%' }}>
          <Text style={{ fontFamily: 'Inter-Medium', color: '#575757' }} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={{ fontFamily: 'Inter-Regular', color: '#7F7F7F', fontSize: 12 }} numberOfLines={1} ellipsizeMode="tail">
            {description}
          </Text>
        </View>
      </View>
    </View>

  );
};

const TodaysGoalList = () => {
  // HEIGHT OF THE LIST ITEM CONTAINER TIMES HOW MANY I WANT TO SHOW
  return (
    <SafeAreaView style={{ height: 64 * 5 }}>
      <FlatList
        data={dummyGoals}
        renderItem={({ item }) => (
          <GestureHandlerRootView style={{backgroundColor: DailyDriveColors.dailyDriveGreen, borderRadius: 5}}>
            <Swipable>
              <GoalListItem title={item.title} category={item.category} description={item.description} />
            </Swipable>
          </GestureHandlerRootView>

        )}
        keyExtractor={item => item.description}
      />
    </SafeAreaView>


  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  checkmarkContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DailyDriveColors.dailyDriveGreen,
    width: 80,
    height: '100%',
    right: 0,
    zIndex: 3
  },
  listItemContainer: {
    width: '100%',
    backgroundColor: '#fff',
    height: 64,
    borderRadius: 5,
    borderColor: '#f8f8f8',
    borderWidth: 2,
    paddingHorizontal: 10,
    justifyContent: 'center',

    // iOS shadow properties
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08, // 8% opacity
    shadowRadius: 31, // 31px blur

    // Android shadow (elevation)
    elevation: 10,
  },
  right: {
    flexDirection: 'row'
  },
  iconStyle: {
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 37,
    height: 37,
    borderRadius: 20,
    backgroundColor: DailyDriveColors.secondaryGreen
  }
})

export default TodaysGoalList;
