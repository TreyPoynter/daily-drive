import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { MainTabNavigator, AuthStackNavigator } from './src/navigators';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { useEffect, useState } from 'react';
import { getLocalItem } from './src/utilities';

const Stack = createNativeStackNavigator();
enableScreens();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded] = useFonts({
    'Poppins-Regular': require('./assets/Poppins/Poppins-Regular.ttf'),
    'Poppins-Thin': require('./assets/Poppins/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    async function checkLoginStatus() {
      const user = await getLocalItem('user')
      setIsLoggedIn(user ? true: false);
    }

    checkLoginStatus();
  })

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabNavigator />
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular'
  },
});
