import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import Login from './Login/Login'
import Register from './Register/Register'
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Goals from './Goals/Goals';

const HomeStack = createNativeStackNavigator();
const GoalStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home}/>
    </HomeStack.Navigator>
  );
}

const GoalStackNavigator = () => {
  return (
    <GoalStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="GoalScreen" component={Goals}/>
    </GoalStack.Navigator>
  );
}
interface ProfileStackNavigatorProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Function type for setIsLoggedIn
}

export const ProfileStackNavigator: React.FC<ProfileStackNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="ProfileScreen" children={() => <Profile setIsLoggedIn={setIsLoggedIn}/>}/>
    </ProfileStack.Navigator>
  );
}

interface MainTabNavigatorProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Function type for setIsLoggedIn
}

export const MainTabNavigator: React.FC<MainTabNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Profile') {
          iconName = 'user-alt';
        } else if (route.name === 'Goals') {
          iconName = 'flag-checkered';
        }

        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
    })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Goals" component={GoalStackNavigator} />
      <Tab.Screen name="Profile" children={() => <ProfileStackNavigator setIsLoggedIn={setIsLoggedIn}/>} />
    </Tab.Navigator>
  );
}

interface AuthStackNavigatorProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Function type for setIsLoggedIn
}


export const AuthStackNavigator: React.FC<AuthStackNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <AuthStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='Login' children={() => <Login setIsLoggedIn={setIsLoggedIn}/>} options={{
        animation: 'slide_from_left',
        animationTypeForReplace: 'push',
        animationDuration: 320
      }}/>
      <AuthStack.Screen name='Register' component={Register} options={{
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
      }}/>
    </AuthStack.Navigator>
  );
}