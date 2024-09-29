import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Animated } from 'react-native';
import { useRef } from 'react';
import { DailyDriveColors } from './colors';
import { FontAwesome5 } from '@expo/vector-icons';
import Login from './Login/Login'
import Register from './Register/Register'
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Goals from './Goals/Goals';
import AddGoal from './AddGoal/AddGoal';

const HomeStack = createNativeStackNavigator();
const GoalStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
    </HomeStack.Navigator>
  );
}

const GoalStackNavigator = () => {
  return (
    <GoalStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="GoalScreen" component={Goals} />
    </GoalStack.Navigator>
  );
}

const AddGoalStackNavigator = () => {
  return (
    <GoalStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="AddGoalScreen" component={AddGoal} />
    </GoalStack.Navigator>
  );
}
interface ProfileStackNavigatorProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Function type for setIsLoggedIn
}

export const ProfileStackNavigator: React.FC<ProfileStackNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="ProfileScreen" children={() => <Profile setIsLoggedIn={setIsLoggedIn} />} />
    </ProfileStack.Navigator>
  );
}

interface MainTabNavigatorProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Function type for setIsLoggedIn
}

export const MainTabNavigator: React.FC<MainTabNavigatorProps> = ({ setIsLoggedIn }) => {
  const animationValue = useRef(new Animated.Value(0)).current; // Value for horizontal movement

  const animateCircle = (index: number) => {
    Animated.timing(animationValue, {
      toValue: index, // Move based on the tab index
      duration: 500, // Smooth horizontal movement
      useNativeDriver: true,
    }).start();
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          elevation: 5,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          let tabIndex;

          if (route.name === 'Home') {
            iconName = 'home';
            tabIndex = 0;
          } else if (route.name === 'Profile') {
            iconName = 'user-alt';
            tabIndex = 3;
          } else if (route.name === 'My Goals') {
            iconName = 'flag-checkered';
            tabIndex = 1;
          } else if (route.name === 'Add Goal') {
            iconName = 'plus-square';
            tabIndex = 2;
          }

          if (focused) {
            animateCircle(tabIndex ?? 0);
          }

          return (
            <View style={styles.iconWrapper}>
              {focused && (
                <>
                  {/* Background crater circle */}
                  <Animated.View
                    style={[
                      styles.craterCircle,
                      {
                        transform: [
                          {
                            translateX: animationValue.interpolate({
                              inputRange: [0, 1, 2],
                              outputRange: [0, 0, 0], // Adjust these values based on the tab position
                            }),
                          },
                        ],
                      },
                    ]}
                  />

                  {/* Main green circle */}
                  <Animated.View
                    style={[
                      styles.greenCircle,
                      {
                        transform: [
                          {
                            translateX: animationValue.interpolate({
                              inputRange: [0, 1, 2],
                              outputRange: [0, 0, 0], // Moves the circle left to right
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                </>
              )}

              <Animated.View
                style={{
                  transform: [{ translateY: focused ? -19 : 0 }],
                }}
              >
                <FontAwesome5
                  name={iconName}
                  size={size}
                  color={focused ? '#fff' : '#B3B3B3'}
                />
              </Animated.View>
            </View>
          );
        },
        tabBarActiveTintColor: DailyDriveColors.dailyDriveGreen, // Active color
        tabBarInactiveTintColor: '#8e8e93', // Inactive color
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="My Goals" component={GoalStackNavigator} />
      <Tab.Screen name="Add Goal" component={AddGoalStackNavigator} />
      <Tab.Screen name="Profile">
        {() => <ProfileStackNavigator setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenCircle: {
    position: 'absolute',
    bottom: 2,
    width: 60,
    height: 60,
    borderRadius: 30, // Half of the width/height for a perfect circle
    backgroundColor: DailyDriveColors.dailyDriveGreen,
    zIndex: 0, // The green circle should be above the crater circle
  },
  craterCircle: {
    position: 'absolute',
    bottom: -3,
    width: 70, // Slightly bigger than the green circle
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f2f2f2', // Slightly gray color for the crater effect
    zIndex: 0, // This should be behind the green circle
  },
});

interface AuthStackNavigatorProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Function type for setIsLoggedIn
}


export const AuthStackNavigator: React.FC<AuthStackNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <AuthStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='Login' children={() => <Login setIsLoggedIn={setIsLoggedIn} />} options={{
        animation: 'slide_from_left',
        animationTypeForReplace: 'push',
        animationDuration: 320
      }} />
      <AuthStack.Screen name='Register' component={Register} options={{
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
      }} />
    </AuthStack.Navigator>
  );
}