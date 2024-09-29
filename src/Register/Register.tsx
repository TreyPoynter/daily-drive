import { Pressable, Keyboard, SafeAreaView, View, Text, StyleSheet, Alert, Image } from "react-native";
import Textbox from "../components/Textbox/Textbox";
import { DailyDriveColors } from "../colors";
import Button from "../components/Button/Button";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from '@react-native-firebase/auth';
import db from "@react-native-firebase/database"

const Register = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [username, setUserName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();

  const createProfile = async (res: FirebaseAuthTypes.UserCredential) => {
    //TODO: CRYPT PASSWORDS
    await db().ref(`/users/${res.user.uid}`).set({ username, email, password });
    await db().ref(`/users/${res.user.uid}/streak`).set({ streak: 0, highestStreak: 0 });
    await db().ref(`/goals/${res.user.uid}`).set({0: ''});
  }

  const registerAndGoToMainFlow = async () => {
    if (!username || !email || !password)  //TODO: MAKE UX BETTER
      return;
    else if (password != confirmPassword)
      return;

    try {
      // attempt to create a user
      const res = await auth().createUserWithEmailAndPassword(email, password
      ).catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Email already in use!')
            break;
          case 'auth/invalid-email':
            Alert.alert('Invalid email!')
            break;
          case 'auth/weak-password':
            Alert.alert('Password must be at least 6 characters!')
            break;
        }
      });

      // check to see if user was created
      if (res?.user) {
        await createProfile(res);
        nav.replace('Home')
      }

    } catch (err: any) {
      Alert.alert(err);
    }
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../../assets/dailydrive-logo.png')} />
        </View>
        <View style={styles.subheaderContainer}>
          <Text style={styles.subheader}>Create Your Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <Textbox header="Username" placeholder="John Doe" fa5Icon="user" onTextChange={setUserName} />
          <View style={{marginTop: 15}}></View>
          <Textbox header="Email" placeholder="sample@example.com" fa5Icon="envelope" onTextChange={setEmail} />
          <View style={{marginTop: 15}}></View>
          <Textbox header="Password" placeholder="************" fa5Icon="lock" onTextChange={setPassword} isSecure={true} />
          <View style={{marginTop: 15}}></View>
          <Textbox header="Confirm Password" placeholder="************" fa5Icon="lock" onTextChange={setConfirmPassword} isSecure={true} />
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Register" />
        </View>
        <View style={styles.noAccountContainer}>
          <View style={styles.seperator}></View>
          <View style={{ marginTop: '10%', justifyContent: 'center', flexDirection: 'row', gap: 5 }}>
            <Text style={{fontFamily: 'Inter-Regular', color: '#7F7F7F'}}>Already have an account?</Text>
            <Pressable onPress={() => nav.navigate('Login')}>
              <Text style={{color: DailyDriveColors.dailyDriveGreen, fontFamily: 'Inter-Bold'}}>Log In</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Positions items to the top
    alignItems: 'center', // Centers items horizontally
    paddingTop: 50, // Adds some space from the top of the screen
    width: '100%',
    backgroundColor: '#fff', // Optional background color
  },
  logo: {
    height: 100,
    resizeMode: 'contain',
  },
  subheaderContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // Adds space between the subheader and the input fields
  },
  subheader: {
    color: '#7F7F7F',
    fontSize: 20,
    fontFamily: 'Inter-Regular',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  noAccountContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: '10%',
  },
  seperator: {
    borderWidth: 0.6,
    borderColor: '#DADADA',
  },
});

export default Register;