import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, type Href } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Palette } from '@/constants/design';

type Props = {
  title: string;
  subtitle: string;
  dateLabel: string;
  info: string;
  href?: Href;
  onAdd?: () => void;
};

// Top hero/header for transaksi screen with CTA to open modal.
export function TransactionHeader({ title, subtitle, dateLabel, info, href, onAdd }: Props) {
  const IconButton = (
    <Pressable
      onPress={onAdd}
      style={({ pressed }) => [
        styles.iconButton,
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
      ]}
      accessibilityLabel="Tambah transaksi">
      <MaterialIcons name="add" size={20} color={Palette.primary} />
    </Pressable>
  );

  return (
    <ThemedView style={styles.heroCard}>
      <View style={styles.heroHeader}>
        <View style={{ gap: 4 }}>
          <ThemedText type="title">{title}</ThemedText>
          <ThemedText style={styles.heroSubtitle}>{subtitle}</ThemedText>
        </View>
        {href ? (
          <Link href={href} asChild>
            {IconButton}
          </Link>
        ) : (
          IconButton
        )}
      </View>
      <View style={styles.heroMeta}>
        <MaterialIcons name="calendar-today" size={16} color="#0f172a" />
        <ThemedText style={styles.heroMetaText}>{dateLabel}</ThemedText>
      </View>
      <View style={styles.heroMeta}>
        <MaterialIcons name="info" size={16} color={Palette.primary} />
        <ThemedText style={styles.heroMetaText}>{info}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: Palette.accentSurface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d5e3ff',
    gap: 10,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  heroSubtitle: {
    color: Palette.slate,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroMetaText: {
    color: '#1f2937',
    fontSize: 14,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
