import { Pressable, Keyboard, SafeAreaView, View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth from '@react-native-firebase/auth';
import { getUserById } from "../services/userService";
import { setLocalItem } from "../utilities";

const Register = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  let iteration = 0;

  useEffect(() => {
    return auth().onAuthStateChanged((currUser) => {
      async function autoLogin() {
        if(!currUser?.uid) return;
        const user = await getUserById(currUser.uid);
        await setLocalItem('user', user);
        nav.replace('Home');
      }
      // to ensure it doesn't get called twice
      if(iteration == 0) autoLogin();
      iteration++
    });
  }, []);

  const goToMainFlow = async () => {
    if (!email || !password)
      return;  //TODO: MAKE UX BETTER
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);

      if (res?.user)
        nav.replace('Home');

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
      <SafeAreaView >
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <Text style={style.titleText}>Daily Drive</Text>
        </View>
        <View style={{ marginHorizontal: '10%', display: 'flex', marginTop: '50%', gap: 40 }}>
          <TextInput
            onChangeText={setEmail}
            style={style.loginTextField}
            placeholder="Email"
          />
          <TextInput
            onChangeText={setPassword}
            style={style.loginTextField}
            secureTextEntry={true}
            placeholder="Password"
          />
        </View>
        <View style={{ marginHorizontal: '10%', marginTop: '44%', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Pressable onPress={goToMainFlow} style={style.loginButton}>
            <Text style={style.buttonText}>Login</Text>
          </Pressable>
          <Pressable onPress={() => nav.replace('Register')} style={style.registerButton}>
            <Text style={style.registerButtonText}>Register</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const style = StyleSheet.create({
  titleText: {
    fontSize: 50,
    fontFamily: 'Poppins-Thin'
  },
  loginTextField: {
    width: '100%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 4,
    fontSize: 19
  },
  loginButton: {
    backgroundColor: '#800080',
    borderColor: '#800080',
    borderWidth: 2,
    paddingHorizontal: '33%',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    backgroundColor: '#fff',
    paddingHorizontal: '36.5%',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d7dede',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Register;