import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { MainTabNavigator, AuthStackNavigator } from './src/navigators';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { useEffect, useState } from 'react';
import { getLocalItem } from './src/utilities';
import { StatusBar } from 'expo-status-bar';
import GradientBackgroundWrapper from './src/components/GradientBackgroundWrapper/GradientBackgroundWrapper';

const Stack = createNativeStackNavigator();
enableScreens();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loaded] = useFonts({
    'Inter-Regular': require('./assets/Inter/static/Inter_18pt-Regular.ttf'),  // 400
    'Inter-Medium': require('./assets/Inter/static/Inter_18pt-Medium.ttf'),  // 500
    'Inter-SemiBold': require('./assets/Inter/static/Inter_24pt-SemiBold.ttf'),  //600
    'Inter-Bold': require('./assets/Inter/static/Inter_18pt-Bold.ttf'),  // 700
  });

  useEffect(() => {
    // Function to check login status
    async function checkLoginStatus() {
      const user = await getLocalItem('user'); // Retrieve 'user' from local storage or async storage
      setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists
    }

    checkLoginStatus(); // Run the function to check login status

  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
    <StatusBar animated={true} backgroundColor="#61dafb"/>
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabNavigator setIsLoggedIn={setIsLoggedIn}/>
        
      ) : (
        <AuthStackNavigator setIsLoggedIn={setIsLoggedIn}/>
      )}
    </NavigationContainer>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Inter-Regular'
  },
});
