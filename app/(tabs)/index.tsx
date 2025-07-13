// Home Screen - Main dashboard for Inner Child app

import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import AvatarCustomizer from '../../components/AvatarCustomizer';
import JournalSection from '../../components/JournalSection';

const { height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const [isAvatarDone, setIsAvatarDone] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* This View groups the top content */}
        <View style={styles.avatarContainer}>
          <AvatarCustomizer 
            onDone={() => setIsAvatarDone(true)}
            onBack={() => setIsAvatarDone(false)}
          />
        </View>

        {/* This section will be positioned at the bottom */}
        {isAvatarDone && (
          <View style={styles.journalContainer}>
            <JournalSection />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F3E0',
    paddingTop: 60,
  },
  avatarContainer: {
    flex: 1,
  },
  journalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: screenHeight / 3,
    backgroundColor: 'transparent',
  },
});