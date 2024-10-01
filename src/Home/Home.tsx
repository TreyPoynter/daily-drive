import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { getLocalItem } from "../utilities";
import GradientBackgroundWrapper from "../components/GradientBackgroundWrapper/GradientBackgroundWrapper";
import CurrentStreak from "../components/CurrentStreak/CurrentStreak";

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
        <View>
          <CurrentStreak/>
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