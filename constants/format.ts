// Currency formatter with a safe fallback for environments where `Intl` may be limited.
export const formatCurrency = (value: number, currency: string) => {
  try {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace(/\u00a0/g, ' ');
  } catch {
    return `${currency} ${value.toLocaleString('id-ID')}`;
  }
};

export const formatCurrencyId = (value: number) => formatCurrency(value, 'IDR');

export type DateFormat = 'DD/MM/YYYY' | 'YYYY-MM-DD';

const pad = (value: number) => String(value).padStart(2, '0');

// Lightweight date formatter to avoid pulling a full date-fns dependency.
export const formatDateByPattern = (input: Date | string, format: DateFormat) => {
  const date = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return '';

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  return format === 'DD/MM/YYYY' ? `${day}/${month}/${year}` : `${year}-${month}-${day}`;
};

export const formatDateWithWeekday = (
  input: Date | string,
  format: DateFormat,
  locale = 'id-ID'
) => {
  const date = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return '';

  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
  return `${weekday}, ${formatDateByPattern(date, format)}`;
};
