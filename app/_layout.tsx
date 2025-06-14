import { ThemedText } from '@/components/ThemedText'; // Added UI component imports
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Stack, router } from 'expo-router'; // Added router import
import * as SplashScreen from 'expo-splash-screen'; // Added splash screen import
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react'; // NEW LINE
import { StyleSheet, TouchableOpacity } from 'react-native'; // Added UI component imports
import 'react-native-reanimated';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// ADD THIS: Define notification categories with actions
Notifications.setNotificationCategoryAsync('INTERACTIVE_CATEGORY', [
  {
    identifier: 'YES_ACTION',
    buttonTitle: 'Yes',
    options: {
      isDestructive: false,
      isAuthenticationRequired: false,
    },
  },
  {
    identifier: 'NO_ACTION',
    buttonTitle: 'Hell no',
    options: {
      isDestructive: true, // Makes it red/destructive looking
      isAuthenticationRequired: false,
    },
  },
]);

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

  const scheduleTestNotification = async () => {
    try {
      console.log('Attempting to schedule notification...');
      
      // Check permissions first
      const { status } = await Notifications.getPermissionsAsync();
      console.log('Current permission status:', status);
      
      if (status !== 'granted') {
        console.log('Permissions not granted, requesting...');
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        console.log('New permission status:', newStatus);
        
        if (newStatus !== 'granted') {
          alert('Notification permissions are required to show notifications');
          return;
        }
      }
      
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Welcome to Inner Child!",
          body: "Are you ready to begin this journey?",
          categoryIdentifier: 'INTERACTIVE_CATEGORY', // Add this line
          data: { 
            welcomeMessage: true,
            timestamp: Date.now()
          },
        },
        trigger: { seconds: 2 },
      });
      
      console.log('Notification scheduled with ID:', notificationId);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  // ADD THE NEW FUNCTION HERE (right after scheduleTestNotification)
  const testImmediateNotification = async () => {
    try {
      console.log('🔔 Testing immediate notification...');
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Ready for your daily check-in? 💭",
          body: "Hold and press this notification to see your options! ✨",
          categoryIdentifier: 'INTERACTIVE_CATEGORY', // This enables the buttons
          data: { 
            customData: 'some data here',
            screen: 'home' 
          },
        },
        trigger: null, // Immediate
      });
      console.log('✅ Interactive notification sent');
    } catch (error) {
      console.error('❌ Error with interactive notification:', error);
    }
  };

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
  
  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
    }

    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    // Listen for notifications when app is in foreground
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('✅ Notification received:', notification);
      // Remove the alert for cleaner experience
      // alert('Notification received: ' + notification.request.content.title);
    });
  
    // Listen for notification responses (when user taps notification OR buttons)
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('✅ Notification response:', response);
      
      // Handle button actions
      if (response.actionIdentifier === 'YES_ACTION') {
        console.log('🎉 User clicked YES!');
        alert('Great! Let\'s continue your journey! 🌟');
        // You can navigate to a specific screen here
        // router.push('/some-screen');
      } else if (response.actionIdentifier === 'NO_ACTION') {
        console.log('😢 User clicked Hell no!');
        alert('That\'s okay, maybe another time! 😊');
        // Handle the "no" response
      } else {
        console.log('📱 User tapped the notification body');
        alert('You tapped the notification!');
      }
    });
  
    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const handleStart = useCallback(() => {
    setShowStartScreen(false);
    scheduleTestNotification();
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
          {/* Add this test button */}
          <TouchableOpacity onPress={testImmediateNotification} style={{ marginTop: 10 }}>
            <ThemedText style={[styles.link, { color: '#FF6B6B' }]}>Test Notification</ThemedText>
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


