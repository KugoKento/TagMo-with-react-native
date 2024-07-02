import { Tabs } from 'expo-router';
import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeAmount from './home';
import Settings from './settings';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="home" component={HomeAmount} options={{ headerShown: false }}/>
      <Drawer.Screen name="settings" component={Settings} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
}
