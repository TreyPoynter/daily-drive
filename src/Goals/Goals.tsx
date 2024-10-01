import { Text, View, StyleSheet, Pressable } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import GradientBackgroundWrapper from "../components/GradientBackgroundWrapper/GradientBackgroundWrapper";

const Goals = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <GradientBackgroundWrapper>
      <View style={styles.container}>
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
          <Pressable onPress={() => nav.navigate('Home')}>
            <FontAwesome6 name="angle-left" size={24} color="black" />
          </Pressable>
          <Text style={{marginLeft: '36.5%', fontFamily: 'Inter-SemiBold'}}>My Goals</Text>
        </View>
        <View style={{marginTop: 30}}>
          <Text style={{fontFamily: 'Inter-SemiBold'}}>Select</Text>
        </View>
      </View>
    </GradientBackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop: 50,
    width: '100%',
    paddingHorizontal: 20,
  }
})

export default Goals;
