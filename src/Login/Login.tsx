import { Pressable, Keyboard, SafeAreaView, View, Text, StyleSheet, TextInput, Alert, Image } from "react-native";
import Button from "../components/Button/Button";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth from '@react-native-firebase/auth';
import { getUserById } from "../services/userService";
import { setLocalItem } from "../utilities";
import Textbox from "../components/Textbox/Textbox";
import { DailyDriveColors } from "../colors";

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  let iteration = 0;

  useEffect(() => {
    return auth().onAuthStateChanged((currUser) => {
      async function autoLogin() {
        if (!currUser?.uid) return;
        const user = await getUserById(currUser.uid);
        await setLocalItem('user', user);
        setIsLoggedIn(true);
        nav.replace('Home', { screen: 'HomeScreen' });
      }
      // to ensure it doesn't get called twice
      if (iteration == 0) autoLogin();
      iteration++
    });
  }, []);

  const goToMainFlow = async () => {
    if (!email || !password)
      return;  //TODO: MAKE UX BETTER
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);

      if (res?.user) {
        setIsLoggedIn(true);
        nav.replace('Home');
      }


    } catch (error: any) {
      // Handle Firebase errors
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Login Error', 'User not found. Please check your email and try again.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Login Error', 'Invalid email format. Please enter a valid email.');
      } else if (error.code === 'auth/invalid-credential') {
        Alert.alert('Login Error', 'Invalid credentials.');
      }
    }
  }

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../../assets/dailydrive-logo.png')} />
        </View>
        <View style={styles.subheaderContainer}>
          <Text style={styles.subheader}>Log in to Your Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <Textbox header="Email" placeholder="sample@example.com" fa5Icon="envelope" onTextChange={setEmail} />
          <View style={{marginTop: 15}}></View>
          <Textbox header="Password" placeholder="************" fa5Icon="lock" onTextChange={setPassword} isSecure={true} />
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Login" />
        </View>
        <View style={styles.noAccountContainer}>
          <View style={styles.seperator}></View>
          <View style={{ marginTop: '15%', justifyContent: 'center', flexDirection: 'row', gap: 5 }}>
            <Text style={{fontFamily: 'Inter-Regular', color: '#7F7F7F'}}>Don't have an account?</Text>
            <Pressable onPress={() => nav.navigate('Register')}>
              <Text style={{color: DailyDriveColors.dailyDriveGreen, fontFamily: 'Inter-Bold'}}>Sign Up</Text>
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
    resizeMode: 'contain'
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
    marginTop: 60
  },
  noAccountContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: '16%'
  },
  seperator: {
    borderWidth: 0.6,
    borderColor: '#DADADA'
  }
});

export default Login;