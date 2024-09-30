import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { getLocalItem } from "../utilities";

const Home = () => {

  const [user, setUser] = useState({username: ''});

  useEffect(() => {
    async function getData() {
      const user = await getLocalItem('user');
      setUser(user);
    }
    getData();
  }, []);

  return(
    <View style={styles.homeContainer}>
    <View>
      <Text style={styles.greetingName}>Hello, {user.username}</Text>
      <Text style={styles.greeting}>Welcome back!</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer:{
    flex: 1,
    justifyContent: 'flex-start', // Positions items to the top
    paddingTop: 50, // Adds some space from the top of the screen
    width: '100%',
    backgroundColor: '#fff', // Optional background color
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