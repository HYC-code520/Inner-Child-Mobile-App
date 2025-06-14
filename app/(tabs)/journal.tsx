import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function JournalScreen() {
  const [journalEntry, setJournalEntry] = useState('');

  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      // Here you'll save to storage later
      Alert.alert('Entry Saved! 📝', 'Your thoughts have been saved safely.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } else {
      Alert.alert('Empty Entry', 'Please write something before saving.');
    }
  };

  const handleGoBack = () => {
    if (journalEntry.trim()) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Do you want to save before leaving?',
        [
          { text: 'Discard', style: 'destructive', onPress: () => router.back() },
          { text: 'Save', onPress: handleSaveEntry },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Removed Stack.Screen - this removes the header */}
      
      {/* Header section - now part of the content */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Dear Inner Child... 💭</ThemedText>
        <ThemedText style={styles.subtitle}>
          What's on your heart today? Write freely and without judgment.
        </ThemedText>
      </View>

      {/* Journal input section */}
      <View style={styles.journalSection}>
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

      {/* Action buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveEntry}>
          <ThemedText style={styles.saveButtonText}>Save Entry 💾</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={handleGoBack}>
          <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1', // Pink background
  },
  header: {
    padding: 20,
    paddingTop: 60, // Account for status bar
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  journalSection: {
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    minHeight: 300,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    minHeight: 250,
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
  },
  actionSection: {
    padding: 20,
    gap: 10,
    backgroundColor: 'transparent',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
});