import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { getLocalItem } from "../utilities";
import GradientBackgroundWrapper from "../components/GradientBackgroundWrapper/GradientBackgroundWrapper";
import CurrentStreak from "../components/CurrentStreak/CurrentStreak";
import TodaysGoalList from "../components/TodaysGoalList/TodaysGoalList";

const Home = () => {

  const [user, setUser] = useState({ username: '' });

  useEffect(() => {
    async function getData() {
      const user = await getLocalItem('user');
      setUser(user);
    }
    getData();
  }, []);

  return (
    <GradientBackgroundWrapper >
      <View style={styles.homeContainer}>
        <View style={{marginBottom: 18}}>
          <Text style={styles.greetingName}>Hello, {user.username}</Text>
          <Text style={styles.greeting}>Welcome back!</Text>
        </View>
        <View style={{marginBottom: 18}}>
          <CurrentStreak/>
        </View>
        <View>
          <Text style={{fontFamily: 'Inter-Medium', fontSize: 16, marginBottom: 8}}>Today's goal</Text>
          <TodaysGoalList/>
        </View>
      </View>
    </GradientBackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    justifyContent: 'flex-start', // Positions items to the top
    paddingTop: 50, // Adds some space from the top of the screen
    width: '100%',
    paddingHorizontal: 20,
  },
  greetingName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    color: '#7F7F7F'
  }
})

export default Home;