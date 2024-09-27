import db from '@react-native-firebase/database';

export const getUserById = async (uid: string) => {
  try {
    const snapshot = await db().ref('/users/' + uid).once('value');

    const userData = snapshot.val();
    if (!userData) {
      throw new Error('User data not found');
    }

    const { username, email } = userData;
    return { username, email };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;  // Optionally re-throw to handle it in the calling function
  }
};