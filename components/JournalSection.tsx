import { ThemedText } from '@/components/ThemedText';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function JournalSection() {
  const [journalEntry, setJournalEntry] = useState('');

  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      // Here you'll save to storage later
      Alert.alert('Entry Saved! 📝', 'Your thoughts have been saved safely.', [
        { text: 'OK' }
      ]);
      setJournalEntry(''); // Clear the entry after saving
    } else {
      Alert.alert('Empty Entry', 'Please write something before saving.');
    }
  };

  // NEW: AI Reflection placeholder function
  const handleAIReflection = () => {
    if (!journalEntry.trim()) {
      Alert.alert(
        'No Entry to Reflect On 🤔',
        'Please write something in your journal first, then I can help you reflect on it with gentle AI guidance.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      '🌟 AI Reflection (Coming Soon!)',
      `This feature will:

• Gently analyze your journal entry
• Detect any negative self-talk or distress
• Offer loving reframes and validation
• Provide symbolic gifts for your inner child
• Share nurturing words and inner safety messages

Your entry will be treated with the utmost care and compassion. 💝`,
      [{ text: 'I can\'t wait! ✨' }]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <ThemedText type="title" style={styles.title}>Dear Inner Child... 💭</ThemedText>
      <ThemedText style={styles.subtitle}>
        What's on your heart today? Write freely and without judgment.
      </ThemedText>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Start writing your thoughts here... 

How are you feeling today? What made you smile? What's worrying you? Remember, this is a safe space for your inner child to express anything."
          placeholderTextColor="#999999"
          value={journalEntry}
          onChangeText={setJournalEntry}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.aiReflectionSection}>
        <TouchableOpacity style={styles.aiReflectionButton} onPress={handleAIReflection}>
          <ThemedText style={styles.aiReflectionButtonText}>✨ Reflect with AI</ThemedText>
          <ThemedText style={styles.aiReflectionSubtext}>
            Get gentle reframes and inner child gifts
          </ThemedText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry}>
        <ThemedText style={styles.saveButtonText}>Save Entry 💾</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 10,
    marginBottom: 0,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    marginHorizontal: 20,
    textAlign: 'center',
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    minHeight: 120,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  textInput: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  aiReflectionSection: {
    marginBottom: 15,
    marginHorizontal: 20,
  },
  aiReflectionButton: {
    backgroundColor: '#90B77D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  aiReflectionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  aiReflectionSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  saveButton: {
    backgroundColor: '#42855B',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});