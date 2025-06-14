// services/notificationService.ts
import * as Notifications from 'expo-notifications';

// Configure how notifications appear when the app is in the foreground
export const configureNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

// Set up notification categories with action buttons
export const setupNotificationCategories = async () => {
  await Notifications.setNotificationCategoryAsync('INTERACTIVE_CATEGORY', [
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
        isDestructive: true,
        isAuthenticationRequired: false,
      },
    },
  ]);
};

// Request notification permissions
export const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return false;
  }
  return true;
};

// Schedule the welcome notification (2 second delay)
export const scheduleWelcomeNotification = async () => {
  try {
    console.log('Attempting to schedule notification...');
    
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return;
    
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Welcome to Inner Child!",
        body: "Are you ready to begin this journey?",
        categoryIdentifier: 'INTERACTIVE_CATEGORY',
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

// Schedule immediate test notification
export const scheduleTestNotification = async () => {
  try {
    console.log('🔔 Testing immediate notification...');
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Ready for your daily check-in? 💭",
        body: "Hold and press this notification to see your options! ✨",
        categoryIdentifier: 'INTERACTIVE_CATEGORY',
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

// Handle notification responses
export const handleNotificationResponse = (response: any) => {
  console.log('✅ Notification response:', response);
  
  if (response.actionIdentifier === 'YES_ACTION') {
    console.log('🎉 User clicked YES!');
    alert('Great! Let\'s continue your journey! 🌟');
  } else if (response.actionIdentifier === 'NO_ACTION') {
    console.log('😢 User clicked Hell no!');
    alert('That\'s okay, maybe another time! 😊');
  } else {
    console.log('📱 User tapped the notification body');
    alert('You tapped the notification!');
  }
};