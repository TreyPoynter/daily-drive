import { Pressable, Keyboard, SafeAreaView, View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from '@react-native-firebase/auth';
import db from "@react-native-firebase/database"

const Register = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const createProfile = async (res: FirebaseAuthTypes.UserCredential) => {
    db().ref(`/users/${res.user.uid}`).set({ name });
  }

  const registerAndGoToMainFlow = async () => {
    if(!email || !password)
      return;
    try {
      // attempt to create a user
      const res = await auth().createUserWithEmailAndPassword(
        email, password
      );

      // check to see if user was created
      if(res.user) {
        await createProfile(res);
        nav.replace('/Home')
      }

    } catch (err) {
      
    }
  };

  return(
    <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
      <SafeAreaView >
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Text style={style.titleText}>Daily Drive</Text>
        </View>
        <View style={{marginHorizontal: '10%', display: 'flex', marginTop: '50%', gap: 40}}>
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
        <View style={{marginHorizontal: '10%', marginTop: '44%', display: 'flex', alignItems: 'center', gap: 10}}>
          <Pressable style={style.loginButton}>
            <Text style={style.buttonText}>Login</Text>
          </Pressable>
          <Pressable style={style.registerButton}>
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
    paddingHorizontal: '40%',
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