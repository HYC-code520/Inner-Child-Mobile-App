import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-reanimated';

// Import notification service functions
import {
  configureNotifications,
  handleNotificationResponse,
  scheduleTestNotification,
  scheduleWelcomeNotification,
  setupNotificationCategories
} from './services/notificationService';

// Configure notifications when app starts
configureNotifications();
setupNotificationCategories();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore error */
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (loaded) {
          await SplashScreen.hideAsync();
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [loaded]);

  // Set up notification listeners
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('✅ Notification received:', notification);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      handleNotificationResponse(response);
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const handleStart = useCallback(() => {
    setShowStartScreen(false);
    scheduleWelcomeNotification();
    router.push('/(tabs)');
  }, []);

  if (!appIsReady) {
    return null;
  }
  
  if (showStartScreen) {
    return (
      <ThemeProvider value={DefaultTheme}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={{ color: '#000000' }}>Start</ThemedText>
          <TouchableOpacity onPress={handleStart}>
            <ThemedText style={styles.link}>Enter App</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={scheduleTestNotification} style={{ marginTop: 10 }}>
            <ThemedText style={[styles.link, { color: '#FF6B6B' }]}>Test Notification</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <StatusBar style="dark" />
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  link: {
    marginTop: 20,
    color: '#007AFF',
  },
});