// Home Screen - Main dashboard for Inner Child app

import React, { useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import AvatarCustomizer from '../../components/AvatarCustomizer';
import JournalSection from '../../components/JournalSection';

export default function HomeScreen() {
  const [isAvatarDone, setIsAvatarDone] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <AvatarCustomizer 
          onDone={() => setIsAvatarDone(true)}
          onBack={() => setIsAvatarDone(false)}
        />
      </View>

      {isAvatarDone && (
        <View style={styles.journalContainer}>
          <JournalSection />
        </View>
      )}
    </View>
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
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 60,
    backgroundColor: 'transparent',
  },
});