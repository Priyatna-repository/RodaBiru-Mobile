import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { TransactionsProvider } from '@/hooks/use-transactions';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TransactionsProvider>
      <PaperProvider theme={MD3LightTheme}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </TransactionsProvider>
  );
}
