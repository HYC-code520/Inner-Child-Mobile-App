// Home Screen - Main dashboard for Inner Child app

import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    View
} from 'react-native';
import AvatarCustomizer from '../../components/AvatarCustomizer';
import JournalHistoryPage from '../../components/JournalHistoryPage';
import JournalSection from '../../components/JournalSection';

// Define interfaces for avatar selections
interface AvatarSelections {
  faceId: string;
  petId: string;
  accessoryId: string;
  backgroundId: string;
}

export default function HomeScreen() {
  const [isAvatarDone, setIsAvatarDone] = useState(false);
  const [showJournalHistory, setShowJournalHistory] = useState(false);
  // Add state for avatar selections
  const [avatarSelections, setAvatarSelections] = useState<AvatarSelections>({
    faceId: 'face-20',
    petId: '',
    accessoryId: '',
    backgroundId: 'backgroung-01'
  });

  // If journal history is shown, render only that component
  // We are removing this conditional rendering to use a Modal instead.

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <AvatarCustomizer 
          onDone={() => setIsAvatarDone(true)}
          onBack={() => setIsAvatarDone(false)}
          onJournalHistory={() => setShowJournalHistory(true)}
          isDone={isAvatarDone}
          selections={avatarSelections}
          onSelectionsChange={setAvatarSelections}
        />
      </View>

      {isAvatarDone && !showJournalHistory && (
        <View style={styles.journalContainer}>
          <JournalSection />
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={showJournalHistory}
        onRequestClose={() => {
          setShowJournalHistory(false);
        }}>
        <JournalHistoryPage 
          onBack={() => setShowJournalHistory(false)} 
        />
      </Modal>
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