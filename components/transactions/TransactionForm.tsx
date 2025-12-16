import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Button, Chip, TextInput } from 'react-native-paper';

import { ThemedText } from '@/components/themed-text';
import { Palette } from '@/constants/design';
import { TransactionDraft, TransactionType } from '@/constants/transactions';

type Props = {
  form: TransactionDraft;
  errors: Record<string, string>;
  onChange: <K extends keyof TransactionDraft>(key: K, value: TransactionDraft[K]) => void;
  onSubmit: () => void;
  onReset: () => void;
};

// Form component to keep screen clean; currently bound to local state, later replace with API call.
export function TransactionForm({ form, errors, onChange, onSubmit, onReset }: Props) {
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const handleChangeDate = (_: DateTimePickerEvent, selected?: Date) => {
    if (selected) {
      onChange('date', selected.toISOString().slice(0, 10));
    }
    setShowDatePicker(false);
  };

  return (
    <View style={{ gap: 12 }}>
      <InputGroup label="Judul" error={errors.title}>
        <TextInput
          // style={styles.input}
          placeholder="Contoh: Penjualan makan siang"
          value={form.title}
          onChangeText={(text) => onChange('title', text)}
        />
      </InputGroup>

      <View style={styles.inlineRow}>
        <InputGroup label="Nominal" error={errors.amount} style={{ flex: 1 }}>
          <TextInput
            mode="outlined"
            placeholder="320000"
            keyboardType="numeric"
            value={form.amount}
            onChangeText={(text) => onChange('amount', text)}
            outlineStyle={styles.inputOutline}
            contentStyle={styles.inputContent}
          />
        </InputGroup>
        <InputGroup label="Metode" error={errors.method} style={{ flex: 1 }}>
          <TextInput
            mode="outlined"
            placeholder="Tunai / QRIS / Transfer"
            value={form.method}
            onChangeText={(text) => onChange('method', text)}
            outlineStyle={styles.inputOutline}
            contentStyle={styles.inputContent}
          />
        </InputGroup>
      </View>

      <View style={styles.inlineRow}>
        <InputGroup label="Kategori" error={errors.category} style={{ flex: 1 }}>
          <TextInput
            mode="outlined"
            placeholder="Makan di tempat / Bahan baku"
            value={form.category}
            onChangeText={(text) => onChange('category', text)}
            outlineStyle={styles.inputOutline}
            contentStyle={styles.inputContent}
          />
        </InputGroup>
        <InputGroup label="Tanggal" error={errors.date} style={{ width: 180 }}>
          <TextInput
            mode="outlined"
            placeholder="YYYY-MM-DD"
            value={form.date ?? ''}
            onChangeText={(text) => onChange('date', text)}
            outlineStyle={styles.inputOutline}
            contentStyle={styles.inputContent}
            right={
              <TextInput.Icon
                icon="calendar-today"
                onPress={() => setShowDatePicker(true)}
                forceTextInputFocus={false}
              />
            }
          />
          <View style={styles.pillRow}>
            <Chip compact mode="outlined" onPress={() => onChange('date', undefined)} style={styles.pillChip}>
              Hari ini
            </Chip>
            <Chip
              compact
              mode="outlined"
              onPress={() => {
                const d = new Date();
                d.setDate(d.getDate() - 1);
                onChange('date', d.toISOString().slice(0, 10));
              }}
              style={styles.pillChip}>
              Kemarin
            </Chip>
          </View>
          {showDatePicker ? (
            <DateTimePicker
              value={form.date ? new Date(form.date) : new Date()}
              mode="date"
              display="spinner"
              onChange={handleChangeDate}
            />
          ) : null}
        </InputGroup>
        <InputGroup label="Jam (opsional)" style={{ width: 140 }}>
          <TextInput
            mode="outlined"
            placeholder="12:00"
            value={form.time}
            onChangeText={(text) => onChange('time', text)}
            outlineStyle={styles.inputOutline}
            contentStyle={styles.inputContent}
          />
        </InputGroup>
      </View>

      <View style={styles.chipRow}>
        {[
          { label: 'Pemasukan', value: 'income' as TransactionType, color: Palette.success },
          { label: 'Pengeluaran', value: 'expense' as TransactionType, color: Palette.danger },
        ].map((option) => {
          const isActive = form.type === option.value;
          return (
            <Chip
              key={option.value}
              compact
              mode={isActive ? 'flat' : 'outlined'}
              selected={isActive}
              selectedColor={option.color}
              onPress={() => onChange('type', option.value)}
              style={styles.chip}>
              {option.label}
            </Chip>
          );
        })}
      </View>

      <View style={styles.buttonRow}>
        <Button
          mode="contained"
          icon={(props) => <MaterialIcons name="save" {...props} />}
          onPress={onSubmit}
          contentStyle={styles.buttonContent}>
          Simpan ke daftar
        </Button>
        <Button
          mode="outlined"
          textColor={Palette.primary}
          icon={(props) => <MaterialIcons name="refresh" {...props} />}
          onPress={onReset}
          contentStyle={styles.buttonContent}>
          Reset
        </Button>
      </View>
    </View>
  );
}

function InputGroup({
  label,
  error,
  style,
  children,
}: {
  label: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) {
  return (
    <View style={[{ gap: 6 }, style]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      {children}
      {error ? <ThemedText style={styles.errorText}>{error}</ThemedText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputOutline: {
    borderRadius: 10,
    borderColor: Palette.border,
  },
  inputContent: {
    paddingVertical: 8,
  },
  inlineRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  pillRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  pillChip: {
    borderRadius: 10,
    borderColor: Palette.border,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  label: {
    color: '#0f172a',
    fontWeight: '600',
    fontSize: 14,
  },
  errorText: {
    color: Palette.danger,
    fontSize: 12,
  },
});
