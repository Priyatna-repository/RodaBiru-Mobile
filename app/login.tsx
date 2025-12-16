import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Palette } from '@/constants/design';
import { useAuth } from '@/hooks/use-auth';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@rodabiru.local');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    const result = await login(email, password);
    if (!result.ok) {
      setError(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Masuk</ThemedText>
        <ThemedText style={styles.subtitle}>Gunakan akun demo untuk mencoba peran Admin/Karyawan.</ThemedText>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          mode="outlined"
          dense
        />
        <TextInput
          label="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          mode="outlined"
          dense
        />
        {error ? <ThemedText style={styles.errorText}>{error}</ThemedText> : null}
        <Button mode="contained" onPress={handleSubmit} disabled={isSubmitting} loading={isSubmitting}>
          Masuk
        </Button>
      </View>

      <View style={styles.demoBox}>
        <ThemedText style={styles.demoTitle}>Akun Demo</ThemedText>
        <ThemedText style={styles.demoItem}>Admin: admin@rodabiru.local / admin123</ThemedText>
        <ThemedText style={styles.demoItem}>Karyawan: staff@rodabiru.local / shift123</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    backgroundColor: Palette.surface,
  },
  header: {
    gap: 6,
  },
  subtitle: {
    color: Palette.slate,
    fontSize: 14,
  },
  form: {
    gap: 12,
  },
  errorText: {
    color: Palette.danger,
    fontSize: 14,
  },
  demoBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Palette.border,
    gap: 6,
  },
  demoTitle: {
    fontWeight: '700',
    color: '#0f172a',
  },
  demoItem: {
    color: Palette.slate,
  },
});
