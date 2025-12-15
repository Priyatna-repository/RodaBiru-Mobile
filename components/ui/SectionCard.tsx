import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Palette } from '@/constants/design';

type Props = ViewProps & {
  title: string;
  hint?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
};

// Reusable card with a header row to keep screens compact and consistent.
export function SectionCard({ title, hint, right, style, children, ...rest }: Props) {
  return (
    <ThemedView style={[styles.card, style]} {...rest}>
      <View style={styles.header}>
        <View style={{ gap: 4, flex: 1 }}>
          <ThemedText type="subtitle">{title}</ThemedText>
          {hint ? <ThemedText style={styles.hint}>{hint}</ThemedText> : null}
        </View>
        {right}
      </View>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  hint: {
    color: Palette.slate,
    fontSize: 13,
  },
});
