import { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Register from './src/Register/Register';
import Home from './src/Home/Home';
import { useFonts } from 'expo-font';
const Stack = createNativeStackNavigator();

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
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
        <Stack.Navigator>
          <Stack.Screen name='' component={Register}/>
        </Stack.Navigator>
      </View>
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
