import db from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { deleteLocalItem } from '../utilities';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
export const getUserById = async (uid: string) => {
  try {
    const snapshot = await db().ref('/users/' + uid).once('value');

    const userData = snapshot.val();
    if (!userData) {
      throw new Error('User data not found');
    }

    const { username, email } = userData;
    return { username, email, uid };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const logoutUser = async (navigation: NativeStackNavigationProp<any>, 
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) => {
  await auth().signOut().then(async () => {
    await deleteLocalItem('user');
    setIsLoggedIn(false)
    navigation.replace('Login');
  })
}