import { ThemedText } from '@/components/ThemedText';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default function JournalSection() {
  const [journalEntry, setJournalEntry] = useState('');

  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      Alert.alert('Entry Saved! 📝', 'Your thoughts have been saved safely.', [
        { text: 'OK' }
      ]);
      setJournalEntry('');
    } else {
      Alert.alert('Empty Entry', 'Please write something before saving.');
    }
  };

  const handleAIReflection = () => {
    if (!journalEntry.trim()) {
      Alert.alert(
        'No Entry to Reflect On 🤔',
        'Please write something in your journal first.',
        [{ text: 'OK' }]
      );
      return;
    }
    Alert.alert('🌟 AI Reflection', 'Coming soon!', [{ text: 'OK' }]);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Dismissible area */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.dismissibleArea} />
      </TouchableWithoutFeedback>

      {/* Bottom content */}
      <View style={styles.bottomContent}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Dear Inner Child... 💭"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={journalEntry}
            onChangeText={setJournalEntry}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAIReflection}
          >
            <ThemedText style={styles.buttonText}>✨ Reflect</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSaveEntry}
          >
            <ThemedText style={styles.buttonText}>💾 Save</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const { height: screenHeight } = Dimensions.get('window');
const INPUT_HEIGHT = screenHeight * 0.15; // 15% of screen height for input

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dismissibleArea: {
    flex: 1, // Takes up all space above the bottom content
  },
  bottomContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    height: INPUT_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 12,
  },
  textInput: {
    height: '100%',
    padding: 16,
    fontSize: 16,
    color: '#000000',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});