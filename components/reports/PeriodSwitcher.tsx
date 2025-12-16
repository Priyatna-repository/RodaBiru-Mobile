import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';

type Props = {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  resetLabel: string;
  onReset: () => void;
  onLabelPress?: () => void;
};

export function PeriodSwitcher({ label, onPrev, onNext, resetLabel, onReset, onLabelPress }: Props) {
  return (
    <View style={styles.switchRow}>
      <Pressable style={styles.circleButton} onPress={onPrev}>
        <MaterialIcons name="chevron-left" size={18} color={Palette.primary} />
      </Pressable>
      <Pressable onPress={onLabelPress} disabled={!onLabelPress}>
        <ThemedText style={[styles.switchLabel, onLabelPress && styles.switchLabelInteractive]}>
          {label}
        </ThemedText>
      </Pressable>
      <Pressable style={styles.circleButton} onPress={onNext}>
        <MaterialIcons name="chevron-right" size={18} color={Palette.primary} />
      </Pressable>
      <Pressable style={styles.resetButton} onPress={onReset}>
        <ThemedText style={styles.resetText}>{resetLabel}</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  switchLabel: {
    fontWeight: '700',
    color: '#0f172a',
  },
  switchLabelInteractive: {
    textDecorationLine: 'underline',
  },
  circleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: Palette.accentSurface,
  },
  resetText: {
    color: Palette.primary,
    fontWeight: '700',
  },
});
