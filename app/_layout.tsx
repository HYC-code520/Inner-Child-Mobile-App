import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-reanimated';
import LoginScreen from './login';
import SignUpScreen from './signup';

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
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
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
    // Instead of navigating, we now show the login modal.
    setLoginModalVisible(true);
  }, []);

  // Placeholder function for successful login/signup
  const handleAuthenticationSuccess = () => {
    setLoginModalVisible(false);
    setSignUpModalVisible(false);
    setShowStartScreen(false); // Hide the start screen
    scheduleWelcomeNotification();
    router.push('/(tabs)');
  };

  if (!appIsReady) {
    return null;
  }

  if (showStartScreen) {
    return (
      <ThemeProvider value={DefaultTheme}>
        <ImageBackground
          source={require('../assets/ICS-start-screen.png')}
          resizeMode="cover"
          style={styles.container}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleStart}>
              <Image
                source={require('../assets/start-button.png')}
                style={styles.startButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={scheduleTestNotification}
              style={styles.testButtonTouchable}
            >
              <ThemedText style={[styles.button, styles.testButton]}>
                Test Notification
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Login Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={loginModalVisible}
          onRequestClose={() => setLoginModalVisible(false)}
        >
          <LoginScreen
            onClose={() => setLoginModalVisible(false)}
            onNavigateToSignUp={() => {
              setLoginModalVisible(false);
              setSignUpModalVisible(true);
            }}
            onLogin={handleAuthenticationSuccess}
          />
        </Modal>

        {/* Sign-Up Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={signUpModalVisible}
          onRequestClose={() => setSignUpModalVisible(false)}
        >
          <SignUpScreen
            onClose={() => setSignUpModalVisible(false)}
            onNavigateToLogin={() => {
              setSignUpModalVisible(false);
              setLoginModalVisible(true);
            }}
            onSignUp={handleAuthenticationSuccess}
          />
        </Modal>

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
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    marginBottom: 0,
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 2,
    paddingHorizontal: 30,
    borderRadius: 25,
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButtonImage: {
    width: 400,
    height: 220,
  },
  testButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.7)',
  },
  testButtonTouchable: {
    transform: [{ translateY: -40 }],
  },
});