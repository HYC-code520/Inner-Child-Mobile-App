import { ThemedText } from '@/components/ThemedText'; // Added UI component imports
import { ThemedView } from '@/components/ThemedView';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router'; // Added router import
import * as SplashScreen from 'expo-splash-screen'; // Added splash screen import
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react'; // NEW LINE
import { StyleSheet, TouchableOpacity } from 'react-native'; // Added UI component imports
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore error */
});
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);      // NEW LINE
  const [showStartScreen, setShowStartScreen] = useState(true);  // NEW LINE 
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Wait for fonts to load
        if (loaded) {
          // Hide the splash screen
          await SplashScreen.hideAsync();
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  
    prepare();
  }, [loaded]);
  
  const handleStart = useCallback(() => {
    setShowStartScreen(false);
    router.push('/(tabs)');
  }, []);

  if (!appIsReady) {
    return null;  // Show nothing while loading
  }
  
  if (showStartScreen) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={{ color: '#000000' }}>Start</ThemedText>
          <TouchableOpacity onPress={handleStart}>
            <ThemedText style={styles.link}>Enter App</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );


}

// Added styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE4E1',
  },
  link: {
    marginTop: 20,
    color: '#007AFF',
  },
});
