import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { DailyDriveColors } from "../../colors";
import { Feather } from "@expo/vector-icons";

const CurrentStreak = () => {
  return(
    <View style={styles.streakContainer}>
      <View style={styles.streakHeader}>
        <View style={styles.streakHeaderLeft}>
          <View style={{borderRadius: 5, borderWidth: 1, borderColor: DailyDriveColors.semiLightGreen}}>
            <Text style={styles.streakGoalTitle}>Gym Everyday</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4}}>
            <Image source={require('../../../assets/flame.png')} style={{height: 15, width: 15}}/>
            <Text style={{fontFamily: 'Inter-Regular', fontSize: 12}}>11 days</Text>
          </View>
        </View>
        <View>
          <Pressable>
            <Text style={{color: '#A5A4A4', fontFamily: 'Inter-Regular', fontSize: 12}}>Change</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.streakDetails}>
        <View style={styles.rightDetails}>
          <View style={styles.currGoal}>
            <Feather name="target" size={16} color={DailyDriveColors.dailyDriveGreen} />
            <View style={{flexDirection: 'row', gap: 4}}>
              <Text style={{fontFamily: 'Inter-SemiBold'}}>Goal:</Text>
              <Text style={{fontFamily: 'Inter-Normal'}}>Fitness</Text>
            </View>
          </View>
          <Text style={{color: DailyDriveColors.dailyDriveGreen, fontFamily: 'Inter-Normal'}}>Ongoing</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  streakContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderColor: '#f8f8f8',
    borderRadius: 7,
    borderWidth: 2
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  streakHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9
  },
  streakGoalTitle: {
    padding: 7,
    fontFamily: 'Inter-SemiBold',
    color: DailyDriveColors.dailyDriveGreen,
    borderRadius: 5,
    backgroundColor: DailyDriveColors.semiLightGreen
  },
  streakDetails: {

  },
  rightDetails: {

  },
  currGoal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8
  }
});

export default CurrentStreak;
