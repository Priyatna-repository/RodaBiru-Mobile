import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';

export type Option<T extends string> = {
  label: string;
  value: T;
  description?: string;
};

type Props<T extends string> = {
  label: string;
  options: Option<T>[];
  selected: T;
  onSelect: (value: T) => void;
};

export function OptionChips<T extends string>({ label, options, selected, onSelect }: Props<T>) {
  const active = options.find((opt) => opt.value === selected);
  return (
    <View style={{ gap: 8 }}>
      <ThemedText style={styles.optionLabel}>{label}</ThemedText>
      <View style={styles.pillsRow}>
        {options.map((opt) => (
          <Pressable
            key={opt.value}
            onPress={() => onSelect(opt.value)}
            style={[
              styles.pill,
              selected === opt.value && styles.pillActive,
              selected === opt.value && { borderColor: Palette.primary },
            ]}>
            <ThemedText style={[styles.pillText, selected === opt.value && styles.pillTextActive]}>
              {opt.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>
      {active?.description ? <ThemedText style={styles.optionHint}>{active.description}</ThemedText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  optionLabel: {
    fontWeight: '700',
    color: '#0f172a',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  pill: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: '#fff',
  },
  pillActive: {
    backgroundColor: Palette.accentSurface,
  },
  pillText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  pillTextActive: {
    color: Palette.primary,
  },
  optionHint: {
    color: Palette.slate,
    fontSize: 12,
  },
});
