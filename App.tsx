import { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import Register from './src/Register/Register';
import Home from './src/Home/Home';
import Login from './src/Login/Login';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';

const Stack = createNativeStackNavigator();
enableScreens();

export default function App() {
  
  const [loaded] = useFonts({
    'Poppins-Regular': require('./assets/Poppins/Poppins-Regular.ttf'),
    'Poppins-Thin': require('./assets/Poppins/Poppins-Thin.ttf'),
  });

  if (!loaded) {
    return null;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Register' component={Register} options={{
          animation: 'slide_from_right',
          animationTypeForReplace: 'push',
        }}/>
        <Stack.Screen name='Login' component={Login} options={{
          animation: 'slide_from_left',
          animationTypeForReplace: 'push',
          animationDuration: 320
        }}/>
      </Stack.Navigator>
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
