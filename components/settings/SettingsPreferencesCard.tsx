import React from 'react';

import { SectionCard } from '@/components/ui/SectionCard';
import { DateFormat } from '@/constants/format';
import { AppSettings, CurrencyCode, WeekStart } from '@/hooks/use-settings';

import { OptionChips, Option } from './OptionChips';

type Props = {
  settings: AppSettings;
  onChange: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
};

const currencyOptions: Option<CurrencyCode>[] = [
  { label: 'IDR (Rp)', value: 'IDR', description: 'Default UMKM Indonesia' },
  { label: 'USD', value: 'USD', description: 'Untuk transaksi campuran' },
];

const dateFormatOptions: Option<DateFormat>[] = [
  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY', description: '14/12/2025' },
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD', description: '2025-12-14' },
];

const weekStartOptions: Option<WeekStart>[] = [
  { label: 'Senin', value: 'monday', description: 'Cocok untuk rekap operasional' },
  { label: 'Minggu', value: 'sunday', description: 'Cocok untuk rekap kas di awal pekan' },
];

export function SettingsPreferencesCard({ settings, onChange }: Props) {
  return (
    <SectionCard title="Preferensi format" hint="Tanggal & mata uang dipakai di Transaksi, Laporan, dan Dashboard">
      <OptionChips<CurrencyCode>
        label="Mata uang"
        selected={settings.currency}
        onSelect={(value) => onChange('currency', value)}
        options={currencyOptions}
      />
      <OptionChips<DateFormat>
        label="Format tanggal"
        selected={settings.dateFormat}
        onSelect={(value) => onChange('dateFormat', value)}
        options={dateFormatOptions}
      />
      <OptionChips<WeekStart>
        label="Awal minggu"
        selected={settings.weekStart}
        onSelect={(value) => onChange('weekStart', value)}
        options={weekStartOptions}
      />
    </SectionCard>
  );
}
