import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';

type Action = { label: string; icon: string; background: string; color: string };

export function QuickActions({ actions }: { actions: Action[] }) {
  return (
    <View style={styles.actionGrid}>
      {actions.map((action) => (
        <Pressable key={action.label} style={[styles.actionButton, { backgroundColor: action.background }]}>
          <MaterialIcons name={action.icon as any} size={22} color={action.color} />
          <ThemedText style={styles.actionLabel}>{action.label}</ThemedText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionButton: {
    padding: 12,
    borderRadius: 12,
    flexBasis: '48%',
    gap: 8,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  actionLabel: {
    fontWeight: '600',
    color: '#0f172a',
  },
});
