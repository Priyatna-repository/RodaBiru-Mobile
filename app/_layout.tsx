import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { SettingsProvider } from '@/hooks/use-settings';
import { TransactionsProvider } from '@/hooks/use-transactions';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;
    const inTabs = segments[0] === '(tabs)';

    if (!user && inTabs) {
      router.replace('/login');
    }

    if (user && !inTabs) {
      router.replace('/(tabs)');
    }
  }, [user, isLoading, segments, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <SettingsProvider>
        <TransactionsProvider>
          <PaperProvider theme={MD3LightTheme}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <AuthGate>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                  <Stack.Screen name="login" options={{ title: 'Login' }} />
                </Stack>
                <StatusBar style="auto" />
              </AuthGate>
            </ThemeProvider>
          </PaperProvider>
        </TransactionsProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
