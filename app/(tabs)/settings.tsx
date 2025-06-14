import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Settings</ThemedText>
      </View>
      
      <View style={styles.content}>
        <View style={styles.comingSoonCard}>
          <ThemedText type="subtitle" style={styles.comingSoonTitle}>
            🚧 Coming Soon!
          </ThemedText>
          <ThemedText style={styles.comingSoonText}>
            We're working on exciting settings and customization options for your Inner Child experience.
          </ThemedText>
          
          <View style={styles.featureList}>
            <ThemedText style={styles.featureItem}>• Notification preferences</ThemedText>
            <ThemedText style={styles.featureItem}>• Theme customization</ThemedText>
            <ThemedText style={styles.featureItem}>• Privacy settings</ThemedText>
            <ThemedText style={styles.featureItem}>• Data export options</ThemedText>
          </View>
        </View>
      </View>
    </View>
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
    color: '#000000',
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  comingSoonCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comingSoonTitle: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  comingSoonText: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  featureList: {
    alignSelf: 'stretch',
  },
  featureItem: {
    color: '#333333',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'left',
  },
});