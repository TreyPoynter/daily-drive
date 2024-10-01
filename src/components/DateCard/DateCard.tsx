import { View, Text, StyleSheet } from "react-native";
import { DailyDriveColors } from "../../colors";

interface DateCardProps {
  date: Date,
  isSelected?: boolean
}

const days = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
]

const DateCard: React.FC<DateCardProps> = ({ date, isSelected = false }) => {
  return(
    <View style={styles.dateCardContainer}>
      <Text style={{fontFamily: 'Poppins-Regular', textTransform: 'uppercase', fontSize: 13}}>{days[date.getDay()]}</Text>
      <Text style={isSelected ? styles.dateSelected : styles.notSelected}>
        {date.getDate()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dateCardContainer: {
    height: 69,
    width: 60,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    marginRight: 7,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08, // 8% opacity
    shadowRadius: 31, // 31px blur

    // Android shadow (elevation)
    elevation: 10,
  },
  dateSelected: {
    backgroundColor: DailyDriveColors.dailyDriveDarkGreen,
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
    fontSize: 16,
    width: 26,
    height: 26,
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    borderRadius: 13,
    overflow: 'hidden',
  },
  notSelected: {
    backgroundColor: '#F6F6F6',
    fontFamily: 'Poppins-Bold',
    color: '#9D9D9D',
    fontSize: 16,
    width: 26,
    height: 26,
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    borderRadius: 13,
    overflow: 'hidden',
  }
})

export default DateCard;