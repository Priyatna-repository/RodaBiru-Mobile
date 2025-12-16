# Roda Biru — Mobile Bookkeeping (Expo)

Aplikasi pencatatan kas untuk Rumah Makan Roda Biru. Fokus pada input transaksi harian, ringkasan kas, laporan harian/bulanan, dan kontrol akses admin/karyawan.

## Status Singkat

- UI dasar: Dashboard, Transaksi, Laporan, Settings.
- State lokal: transaksi + ringkasan kas, settings (nama usaha, alamat, format tanggal, mata uang, minggu mulai).
- Laporan lokal: rekap harian/bulanan, komponen reusable (switcher, tiles, list).
- Auth demo: login berbasis AsyncStorage (admin/karyawan), guard routing, tab role-based (Settings hanya admin).

## Cara Jalanin

```bash
npm install
npm run lint   # opsional cek lint
npx expo start
```

Gunakan kredensial demo di layar login:
- Admin: `admin@rodabiru.local` / `admin123`
- Karyawan: `staff@rodabiru.local` / `shift123`

## Struktur Cepat

- `app/_layout.tsx` — provider & AuthGate.
- `app/(tabs)/` — dashboard, transaksi, laporan, settings (role-based tab).
- `hooks/` — `use-transactions`, `use-settings`, `use-auth`.
- `components/settings/` — kartu modular settings.
- `components/reports/` — komponen laporan reusable.

## Next Steps (dev)

- Picker logo (expo-image-picker) + simpan di settings.
- Date/month picker di Reports + filter kategori/tipe; batasi laporan karyawan ke hari ini.
- Bootstrap backend Laravel + Sanctum, migrate+seed demo, kontrak OpenAPI untuk auth/kategori/transaksi/laporan.
