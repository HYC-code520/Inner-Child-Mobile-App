// Home Screen - Main dashboard for Inner Child app

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const handleNextToJournal = () => {
    console.log('Button pressed! Navigating to journal...');
    try {
      router.push('/(tabs)/journal');
      console.log('Navigation called successfully');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header} lightColor="transparent" darkColor="transparent">
        <ThemedText type="title" style={styles.welcomeText}>Welcome Back! 🌟</ThemedText>
        <ThemedText type="default" style={styles.subtitleText}>
          Let's nurture your inner child today
        </ThemedText>
      </ThemedView>

      {/* Customize Your Inner Child Section */}
      <ThemedView style={styles.customizeSection} lightColor="rgba(255, 255, 255, 0.8)" darkColor="rgba(255, 255, 255, 0.8)">
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Customize Your Inner Child ✨
        </ThemedText>
        
        {/* Placeholder for customization - you'll design this later */}
        <ThemedView style={styles.customizePlaceholder} lightColor="rgba(255, 182, 193, 0.3)" darkColor="rgba(255, 182, 193, 0.3)">
          <ThemedText style={styles.placeholderText}>
            🎨 Character customization coming soon!
          </ThemedText>
          <ThemedText style={styles.placeholderSubtext}>
            Choose your inner child's appearance, personality, and favorite activities
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Navigation to Journal */}
      <ThemedView style={styles.navigationSection} lightColor="transparent" darkColor="transparent">
        <TouchableOpacity style={styles.nextButton} onPress={handleNextToJournal}>
          <ThemedText style={styles.nextButtonText}>Next: Journal Entry 📝</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Optional: Quick Stats or Recent Activity */}
      <ThemedView style={styles.quickStatsSection} lightColor="rgba(255, 255, 255, 0.6)" darkColor="rgba(255, 255, 255, 0.6)">
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Your Journey So Far 🌱
        </ThemedText>
        <ThemedView style={styles.statsContainer} lightColor="transparent" darkColor="transparent">
          <ThemedView style={styles.statItem} lightColor="transparent" darkColor="transparent">
            <ThemedText style={styles.statNumber}>7</ThemedText>
            <ThemedText style={styles.statLabel}>Days Active</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem} lightColor="transparent" darkColor="transparent">
            <ThemedText style={styles.statNumber}>12</ThemedText>
            <ThemedText style={styles.statLabel}>Journal Entries</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem} lightColor="transparent" darkColor="transparent">
            <ThemedText style={styles.statNumber}>😊</ThemedText>
            <ThemedText style={styles.statLabel}>Current Mood</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

// Keep your existing styles - they're fine
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  customizeSection: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
  },
  customizePlaceholder: {
    padding: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFB6C1',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  navigationSection: {
    margin: 20,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  quickStatsSection: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
});