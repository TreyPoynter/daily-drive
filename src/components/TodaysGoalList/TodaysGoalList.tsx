import { View, StyleSheet, Text, FlatList, SafeAreaView, PanResponder, Animated } from "react-native";
import { useRef } from "react";
import goalCategories from "../../AddGoal/goalCategories";
import { FontAwesome5 } from "@expo/vector-icons";
import { DailyDriveColors } from "../../colors";

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
  
  // Create animated value to track the horizontal position of the list item
  const pan = useRef(new Animated.Value(0)).current;
  const checkmarkVisible = useRef(false); // Track if the checkmark is visible

  // Define the PanResponder for handling swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 10, // Detect horizontal movement
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < 0) {
          // Only allow movement to the left (dx < 0)
          Animated.event([null, { dx: pan }], { useNativeDriver: false })(evt, gestureState);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -200) {
          // If swiped enough to the left, lock position at -200 and show the checkmark
          checkmarkVisible.current = true;
          Animated.spring(pan, {
            toValue: -200, // Lock the position after swipe
            useNativeDriver: false,
          }).start();
        } else {
          // If not swiped enough, reset position
          checkmarkVisible.current = false;
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  // Interpolating the checkmark opacity and position from the swipe gesture
  const checkmarkOpacity = pan.interpolate({
    inputRange: [-150, -50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Green checkmark that appears when swiped */}
      <Animated.View style={[styles.checkmarkContainer, { opacity: checkmarkOpacity }]}>
        <FontAwesome5 name="check" size={20} color={'#fff'} />
      </Animated.View>

      {/* Swipeable content */}
      <Animated.View
        style={[styles.listItemContainer, { transform: [{ translateX: pan }] }]}
        {...panResponder.panHandlers}
      >
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
      </Animated.View>
    </View>
  );
};

const TodaysGoalList = () => {
  // HEIGHT OF THE LIST ITEM CONTAINER TIMES HOW MANY I WANT TO SHOW
  return (
    <SafeAreaView style={{ height: 64*5 }}> 
      <FlatList
        data={dummyGoals}
        renderItem={({ item }) => <GoalListItem title={item.title} category={item.category} description={item.description} />}
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
