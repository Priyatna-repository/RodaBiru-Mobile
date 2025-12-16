import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth, type UserRole } from '@/hooks/use-auth';

type TabItem = {
  name: string;
  title: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  size?: number;
  roles: UserRole[];
};

const TAB_ITEMS: TabItem[] = [
  { name: 'index', title: 'Dashboard', icon: 'home-filled', size: 26, roles: ['admin', 'karyawan'] },
  { name: 'explore', title: 'Transaksi', icon: 'receipt-long', size: 24, roles: ['admin', 'karyawan'] },
  { name: 'reports', title: 'Laporan', icon: 'stacked-line-chart', size: 24, roles: ['admin', 'karyawan'] },
  { name: 'settings', title: 'Settings', icon: 'settings', size: 26, roles: ['admin'] },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const role: UserRole = user?.role ?? 'karyawan';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      {TAB_ITEMS.map((item) => {
        const hasAccess = item.roles.includes(role);
        return (
          <Tabs.Screen
            key={item.name}
            name={item.name}
            options={{
              title: item.title,
              href: hasAccess ? undefined : null,
              tabBarIcon: ({ color }) => (
                <MaterialIcons size={item.size ?? 24} name={item.icon} color={color} />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
