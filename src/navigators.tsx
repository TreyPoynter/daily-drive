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

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="ProfileScreen" component={Profile}/>
    </ProfileStack.Navigator>
  );
}

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;

        // Choose the icon based on the route name
        if (route.name === 'Home') {
          iconName = 'home'; // Icon for Home screen
        } else if (route.name === 'Profile') {
          iconName = 'user-alt'; // Icon for Profile screen
        } else if (route.name === 'Goals') {
          iconName = 'flag-checkered'; // Icon for Profile screen
        }

        // Return the Ionicons component
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
    })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Goals" component={GoalStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='Login' component={Login} options={{
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