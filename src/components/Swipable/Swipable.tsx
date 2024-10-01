import { View, useWindowDimensions } from "react-native";
import { FC, useState } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  runOnJS
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons'; // Importing FontAwesome5 for checkmark

interface SwipableProps {
  children: React.ReactNode;
  style?: any;
  onSwipeComplete?: () => void; // function prop
}

const Swipable: FC<SwipableProps> = ({ children, style, onSwipeComplete }) => {
  const screenWidth = useWindowDimensions().width;
  const translateX = useSharedValue(0);
  const scaleX = useSharedValue(0);
  const [loaded, setLoaded] = useState(false);
  const [swiped, setSwiped] = useState(false); // state to track if swiped

  // Function to set swiped state on JS thread
  const handleSwipeComplete = () => {
    setSwiped(true);
    if (onSwipeComplete) {
      onSwipeComplete();
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (_) => {
      if (translateX.value > 100) { // Swipe threshold
        translateX.value = withTiming(screenWidth, {}, () => {
          scaleX.value = withTiming(0);
          runOnJS(handleSwipeComplete)(); // Run the swipe complete function on JS thread
        });
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  // Animating the swiping content
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  // Opacity of the checkmark, interpolating based on swipe distance
  const checkmarkOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, 100], [0, 1]);
    return { opacity };
  });

  return (
    <>
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        onGestureEvent={gestureHandler}
      >
        <Animated.View
          style={{ ...style, position: 'relative' }} // Ensure relative positioning
          onLayout={e => {
            if (!loaded) {
              scaleX.value = e.nativeEvent.layout.height;
              setLoaded(true);
            }
          }}
        >
          {/* Fixed checkmark on the left side with fade-in effect */}
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: 15,
                top: '50%',
                transform: [{ translateY: -12 }], // Center the checkmark vertically
              },
              checkmarkOpacity, // Apply opacity animation
            ]}
          >
            <FontAwesome5 name="check-circle" size={24} color="#fff" />
          </Animated.View>

          {/* Swipeable content */}
          <Animated.View style={[animatedStyle]}>
            {children}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Swipable;
