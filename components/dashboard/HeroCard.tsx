import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Palette } from '@/constants/design';

type Props = {
  title: string;
  subtitle: string;
  caption: string;
  badge: string;
  reminders: string[];
  logoUri?: string | null;
};

// Dashboard hero/top card.
export function HeroCard({ title, subtitle, caption, badge, reminders, logoUri }: Props) {
  return (
    <ThemedView style={styles.heroCard}>
      <View style={styles.heroHeader}>
        <View style={styles.heroLeft}>
          <View style={styles.logoBadge}>
            {logoUri ? (
              <Image source={{ uri: logoUri }} style={styles.logoImage} />
            ) : (
              <MaterialIcons name="storefront" size={18} color={Palette.primary} />
            )}
          </View>
          <View style={{ gap: 4 }}>
            <ThemedText type="subtitle" style={styles.heroTitle}>
              {title}
            </ThemedText>
            <ThemedText style={styles.heroSubtitle}>{subtitle}</ThemedText>
            <ThemedText style={styles.heroCaption}>{caption}</ThemedText>
          </View>
        </View>
        <View style={styles.statusPill}>
          <MaterialIcons name="verified" size={18} color={Palette.primary} />
          <ThemedText style={styles.statusText}>{badge}</ThemedText>
        </View>
      </View>
      <View style={styles.heroMetrics}>
        {reminders.map((text) => (
          <View key={text} style={styles.highlightItem}>
            <MaterialIcons name="schedule" size={16} color={Palette.primary} />
            <ThemedText style={styles.highlightText}>{text}</ThemedText>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: Palette.accentSurface,
    borderWidth: 1,
    borderColor: '#d5e3ff',
    gap: 12,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  heroLeft: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    alignItems: 'center',
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9e3ff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroTitle: {
    color: Palette.primary,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#1e293b',
  },
  heroCaption: {
    color: Palette.slate,
  },
  statusPill: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9e3ff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    color: Palette.primary,
    fontSize: 14,
  },
  heroMetrics: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  highlightItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  highlightText: {
    color: '#1e293b',
    fontSize: 14,
  },
});
