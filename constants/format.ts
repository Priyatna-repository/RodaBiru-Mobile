// Currency formatter for Indonesian Rupiah with a safe fallback for environments
// where `Intl` may be limited (older Android WebViews).
export const formatCurrencyId = (value: number) => {
  try {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace(/\u00a0/g, ' ');
  } catch {
    return `Rp ${value.toLocaleString('id-ID')}`;
  }
};
