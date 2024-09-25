import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Register from './src/Register/Register';
import { useFonts } from 'expo-font';

export default function App() {

  const [loaded] = useFonts({
    'Poppins-Regular': require('./assets/Poppins/Poppins-Regular.ttf'),
    'Poppins-Thin': require('./assets/Poppins/Poppins-Thin.ttf'),
  });

  if (!loaded) {
    return null;
  }


  return (
    <View style={styles.container}>
      <Register/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular'
  },
});
