import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';

interface DraggableAccessoryProps {
  source: ImageSourcePropType;
  isLocked: boolean;
}

export default function DraggableAccessory({ source, isLocked }: DraggableAccessoryProps) {
  // Shared values for position and scale
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  // Store the state of the gesture
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const savedScale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  // Combine gestures to allow both at once
  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={isLocked ? undefined : composedGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image source={source} style={styles.image} />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 100, // Initial size
    height: 100, // Initial size
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
}); 