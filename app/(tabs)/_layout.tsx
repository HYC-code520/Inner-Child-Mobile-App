import { Tabs } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {
  const colorScheme = 'light'; // Force light mode

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#999999',
      headerShown: false,
      // tabBarButton: HapticTab, // COMMENT THIS OUT TEMPORARILY
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopColor: '#E0E0E0',
        borderTopWidth: 1,
      },
    }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}