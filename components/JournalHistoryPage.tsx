import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

// Temporary mock data - replace with actual data from your storage later
const mockEntries = [
  {
    id: '1',
    content: 'Today I felt proud of myself for completing a challenging task...',
    date: '2025-06-20',
    time: '3:30 PM'
  },
  {
    id: '2',
    content: 'I learned that it\'s okay to take breaks and care for myself...',
    date: '2025-06-19',
    time: '2:15 PM'
  },
  {
    id: '3',
    content: 'I realized that being kind to myself is just as important as being kind to others...',
    date: '2025-06-18',
    time: '11:45 AM'
  },
];

interface JournalHistoryPageProps {
  onBack: () => void;
}

export default function JournalHistoryPage({ onBack }: JournalHistoryPageProps) {
  const renderJournalEntry = (entry) => (
    <View key={entry.id} style={styles.entryContainer}>
      <View style={styles.entryHeader}>
        <ThemedText style={styles.entryDate}>
          {entry.date}
        </ThemedText>
        <ThemedText style={styles.entryTime}>
          {entry.time}
        </ThemedText>
      </View>
      <View style={styles.entryContent}>
        <ThemedText style={styles.entryText}>
          {entry.content}
        </ThemedText>
      </View>
      <View style={styles.entryFooter}>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => {/* Handle reflect */}}
        >
          <ThemedText style={styles.footerButtonText}>✨ Reflect</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => {/* Handle delete */}}
        >
          <ThemedText style={styles.footerButtonText}>🗑️ Delete</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Journal History</ThemedText>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {mockEntries.length > 0 ? (
          mockEntries.map(renderJournalEntry)
        ) : (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyMessage}>
              No journal entries yet. Start writing to see your history here! ✍️
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F3E0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  entryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 16,
    width: screenWidth - 32,
    overflow: 'hidden',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  entryDate: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  entryTime: {
    fontSize: 14,
    color: '#666',
  },
  entryContent: {
    padding: 16,
  },
  entryText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  entryFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  footerButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
  },
  footerButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    maxWidth: '80%',
  },
}); 