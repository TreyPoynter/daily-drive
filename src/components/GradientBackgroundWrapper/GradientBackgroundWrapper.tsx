import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackgroundWrapper = ({ children }) => {
  return (
    <LinearGradient
      colors={['#ffffff', '#f2f2f2']} // White to light gray
      locations={[0, 1]} // Smooth transition from white at the top to light gray at the bottom
      style={styles.gradient}
    >
      {/* Wrapping everything inside SafeAreaView */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {children}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1, // Gradient fills the whole screen
  },
  safeArea: {
    flex: 1, // Makes sure SafeAreaView stretches the full screen
  },
  container: {
    flexGrow: 1, // Ensures children take the available space but doesn't mess up the tab bar
  },
});

export default GradientBackgroundWrapper;
