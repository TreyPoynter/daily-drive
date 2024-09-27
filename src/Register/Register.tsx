import { Pressable, Keyboard, SafeAreaView, View, Text, StyleSheet, TextInput, Alert } from "react-native";
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
      Alert.alert(err)
      console.log(err)
    }
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView >
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <Text style={style.titleText}>Daily Drive</Text>
        </View>
        <View style={{ marginHorizontal: '10%', display: 'flex', marginTop: '50%', gap: 40 }}>
          <TextInput
            onChangeText={setUserName}
            style={style.loginTextField}
            placeholder="Username"
          />
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
          <TextInput
            onChangeText={setConfirmPassword}
            style={style.loginTextField}
            secureTextEntry={true}
            placeholder="Confirm Password"
          />
        </View>
        <View style={{ marginHorizontal: '10%', marginTop: '11%', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Pressable onPress={registerAndGoToMainFlow} style={style.loginButton}>
            <Text style={style.buttonText}>Register</Text>
          </Pressable>
          <Pressable onPress={() => nav.replace('Login')} style={style.registerButton}>
            <Text style={style.registerButtonText}>Login</Text>
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